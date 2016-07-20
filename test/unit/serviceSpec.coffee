describe 'sTeam REST API service tests.', ->
	it 'Dummy test should return 2 + 2', ->
		expect(2+2).toEqual(4)

	it 'Dummy test(Failed case) should return 2 + 2', ->
		expect(2+5).toEqual(4)

	beforeEach module 'LocalStorageModule'
	beforeEach angular.mock.module 'steam-service'
	steam = this

	describe 'Check version of sTeam-service', ->
		it 'should return current version', inject (version) ->
			expect(version).toEqual('0.1')
	
	beforeEach inject (_steam_) ->
		steam= _steam_
	describe 'Check sTeam service injection', -> 
		it 'steam service should exist', ->
			expect(steam).toBeDefined()

	describe 'Check sTeam service functions are defined.', -> 
		describe ' Check the sTeam REST API private functions.', ->
			it 'steam service handle request function should exist', ->
				expect(steam.handle_request).toBeDefined()
			it 'steam service headers function should exist', ->
				expect(steam.headers).toBeDefined()
		describe ' Check the sTeam REST API public functions.', ->
			it 'steam service login function should exist', ->
				expect(steam.login).toBeDefined()
			it 'steam service loginp function should exist', ->
				expect(steam.loginp).toBeDefined()
			it 'steam service logout function should exist', ->
				expect(steam.logout).toBeDefined()
			it 'steam service user function should exist', ->
				expect(steam.user).toBeDefined()
			it 'steam service get function should exist', ->
				expect(steam.get).toBeDefined()
			it 'steam service put function should exist', ->
				expect(steam.put).toBeDefined()
			it 'steam service post function should exist', ->
				expect(steam.post).toBeDefined()
			it 'steam service delete function should exist', ->
				expect(steam.delete).toBeDefined()
	
