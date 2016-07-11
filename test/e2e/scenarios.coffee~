angular.scenario.dsl 'expectClass', -> (klass, selector, label) ->
	expect(element(selector, label).prop('classList')).toContain klass

angular.scenario.dsl 'expectViewText', -> (text, selector, label) ->
	expect(element("[ng-view] "+ (selector || ''), label).text()).toMatch text

describe 'sTeam REST API app', ->
	describe 'root page', ->
		beforeEach -> browser().navigateTo '/'
		it 'shows the home page', -> expect(browser().location().url()).toBe "/home"
	
	describe 'Home page', ->
		beforeEach -> browser().navigateTo '#/home'
		it 'Shows the home page', -> expect(browser().location().url()).toBe "/home"

	describe 'About page', ->
		beforeEach -> browser().navigateTo '#/about'
		it 'Shows the about page', -> expect(browser().location().url()).toBe "/about"

	describe 'register and activate', ->
		beforeEach -> browser().navigateTo '#/register'
		it 'registration successful', ->
			input('registerdata.fullname').enter('test user tg ')
			input('registerdata.email').enter('martin@ekita.co')
			input('registerdata.password').enter('abc123')
			input('registerdata.password2').enter('abc123')
			element('#registerhere').click()
			expect(element('#newuserid').text()).toContain 'test.user.tg'
			element('#activation_link').click()
			expect(element('#activation').text()).toContain 'user is activated'


