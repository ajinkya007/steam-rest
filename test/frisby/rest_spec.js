var frisby = require('frisby');

//
// Generic testing functions
//

function testMe (me) {
  expect( me.name ).toEqual( jasmine.any(String) );
  expect( me.documents ).toEqual( jasmine.any(Number) );
  expect( me.id ).toEqual( jasmine.any(String) );
  expect( me.path ).toEqual( jasmine.any(String) );
  expect( me.description ).toEqual( jasmine.any(String) );
  expect( me.vsession ).toEqual( jasmine.any(String) );
  expect( me['class'] ).toEqual( jasmine.any(String) );
  expect( me.oid ).toEqual( jasmine.any(Number) );
  expect( me.links ).toEqual( jasmine.any(Number) );
  expect( me.icon ).toBeDefined();
  expect( me.fullname ).toEqual( jasmine.any(String) );
}

function testEvent(e) {
  expect(e['class']).toEqual( jasmine.any(String) );
  expect(e.title).toEqual( jasmine.any(String) );
  expect(e.name).toEqual( jasmine.any(String) );
  expect(e.id).toEqual( jasmine.any(String) );
  expect(e.path).toEqual( jasmine.any(String) );
  expect(e.type).toEqual( jasmine.any(String) );

  expect(e.oid).toEqual( jasmine.any(Number) );

  toBeStringIfExists( e.description );
  toBeStringIfExists( e.eventid );
  toBeStringIfExists( e.category );
  toBeStringIfExists( e.owner );
  toBeStringIfExists( e.address );
  toBeStringIfExists( e.city );
  toBeStringIfExists( e['time'] );

  toBeDateIfExists( e.date );

  toBeObjectIfExists( e.events );

  if ( e.schedule ) {
    e.schedule.forEach(function(schedule) {
      expect( schedule.type ).toEqual( jasmine.any(String) );
      expect( schedule.name ).toEqual( jasmine.any(String) );
      expect( schedule.title ).toEqual( jasmine.any(String) );
      expect( schedule.id ).toEqual( jasmine.any(String) );
      expect( schedule.path ).toEqual( jasmine.any(String) );
      expect( schedule['class'] ).toEqual( jasmine.any(String) );
      expect( schedule.oid ).toEqual( jasmine.any(Number) );

      toBeStringIfExists( schedule.address )

      toBeDateIfExists( schedule.date );
    });
  }
  
  if ( e.keywords ) {
    e.keywords.forEach(function(word) {
      expect( word ).toEqual( jasmine.any(String) );
    })
  };
}

//
// Useful helpers
//

function toBeStringIfExists(val) {
  if ( val ) 
    expect( val ).toEqual( jasmine.any(String) );
}
function toBeObjectIfExists(val) {
  if ( val ) 
    expect( val ).toEqual( jasmine.any(Object) );
}
function toBeDateIfExists (val) {
  if ( val ) {
    var date = new Date(val);
    expect( date ).toEqual( jasmine.any(Object) );
  }
}


//
// Actual Tests
//

frisby.create('Test techgrind.events to be well-formed')
  .get('http://ngtg.techgrind.asia/scripts/rest.pike?request=techgrind.events')
  .expectStatus(200)
  .expectJSON({
    "request": "techgrind.events",
    "request-method": "GET",
    "me": testMe,
    "event-list": function(val) { 
      val.forEach(function(e) {
        testEvent(e);
      });
    }
  })
  .toss();

frisby.create('Test techgrind.events/order-by-date to be well-formed')
  .get('http://ngtg.techgrind.asia/scripts/rest.pike?request=techgrind.events/order-by-date')
  .expectStatus(200)
  .expectJSON({
    "request": "techgrind.events/order-by-date",
    "request-method": "GET",
    "me": testMe,
    "event-list": function(val) { 
      val.forEach(function(e) {
        testEvent(e);
      });
    }
  })
  .toss();

frisby.create('Testing an instance of an event to be well-formed')
  .get('http://ngtg.techgrind.asia/scripts/rest.pike?request=techgrind.events.blug-coding-for-fun')
  .expectStatus(200)
  .expectJSON({
    "request": "techgrind.events.blug-coding-for-fun",
    "request-method": "GET",
    "me": testMe,
    "event": testEvent
  })
  .toss();

//Test if the user can login
frisby.create('Testing login API calls.')
  .get('http://steam.realss.com/scripts/rest.pike?request=login', {
    userid: "aj007",
    password: "ajinkya"
  }, {json: true})
  .expectStatus(200)
  .expectJSON({
    "request-method": "GET",
    "request": "login",
    "me": testMe,
    "__version": testRegistrationVersion,
    "__date": testRegistrationDate,
    "error": "request not found",
    "login": "user not logged in"
  })
  .toss();

//Test the user home directory.
frisby.create('Testing user home directory.')
  .get('http://steam.realss.com/scripts/rest.pike?request=aj007', {
    userid: "aj007",
    password: "ajinkya"
  }, {json: true})
  .expectStatus(200)
  .expectJSON({
    "request-method": "GET",
    "request": "aj007",
    "me": testMe,
    "__version": testRegistrationVersion,
    "__date": testRegistrationDate,
  })
  .toss();

//Test whether a user workarea exists or not. Here aj workarea has been created by the user.
frisby.create('Testing user created workarea.')
  .get('http://steam.realss.com/scripts/rest.pike?request=aj007/aj', {
    userid: "aj007",
    password: "ajinkya"
  }, {json: true})
  .expectStatus(200)
  .expectJSON({
    "request-method": "GET",
    "request": "aj007/aj",
    "me": testMe,
    "__version": testRegistrationVersion,
    "__date": testRegistrationDate,
  })
  .toss();

//Test whether a user created container exists or not.
frisby.create('Testing a user created container.')
  .get('http://steam.realss.com/scripts/rest.pike?request=aj007/container', {
    userid: "aj007",
    password: "ajinkya"
  }, {json: true})
  .expectStatus(200)
  .expectJSON({
    "request-method": "GET",
    "request": "aj007/container",
    "me": testMe,
    "__version": testRegistrationVersion,
    "__date": testRegistrationDate,
    })
  .toss();

//Test whether a user created document exists or not.
frisby.create('Testing a user created document.')
  .get('http://steam.realss.com/scripts/rest.pike?request=aj007/abc.pike', {
    userid: "aj007",
    password: "ajinkya"
  }, {json: true})
  .expectStatus(200)
  .expectJSON({
    "request-method": "GET",
    "request": "aj007/abc.pike",
    "me": testMe,
    "__version": testRegistrationVersion,
    "__date": testRegistrationDate,
    })
  .toss();

//Test whether a user created image(object of any mime-type) inside a container exists or not.
frisby.create('Testing a user created document inside a container.')
  .get('http://steam.realss.com/scripts/rest.pike?request=aj007/container/Image.jpeg', {
    userid: "aj007",
    password: "ajinkya"
  }, {json: true})
  .expectStatus(200)
  .expectJSON({
    "request-method": "GET",
    "request": "aj007/container/Image.jpeg",
    "me": testMe,
    "__version": testRegistrationVersion,
    "__date": testRegistrationDate,
    })
  .toss();

//Test whether a user created document exists or not.
//The group name and the subgroups can be queried.
//eg. GroupName: groups, Subgroup: test.
//The subgroup should be appended using "." to the groupname.
frisby.create('Testing user created group and subgroup.')
  .get('http://steam.realss.com/scripts/rest.pike?request=groups.test')
  .expectStatus(200)
  .expectJSON({
    "request-method": "GET",
    "request": "groups.test",
    "me": testMe,
    "__version": testRegistrationVersion,
    "__date": testRegistrationDate,
    })
  .toss();

//Here "groups" is a Groupname and "gsoc" is a subgroup of it.
frisby.create('Testing user created group and subgroup.')
  .get('http://ngtg.techgrind.asia/scripts/rest.pike?request=groups.gsoc')
  .expectStatus(200)
  .expectJSON({
    "request-method": "GET",
    "request": "groups.gsoc",
    "me": testMe,
    "__version": testRegistrationVersion,
    "__date": testRegistrationDate,
    })
  .toss();

