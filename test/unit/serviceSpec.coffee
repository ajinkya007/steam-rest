describe 'sTeam REST API service tests.', ->
	it 'Dummy test should return 2 + 2', ->
		expect(2+2).toEqual(4)

	it 'Dummy test(Failed case) should return 2 + 2', ->
		expect(2+5).toEqual(4)

	beforeEach module 'LocalStorageModule'
	beforeEach angular.mock.module 'steam-service'
	steam = this

	describe 'version', ->
		it 'should return current version', inject (version) ->
			expect(version).toEqual('0.1')

	beforeEach inject (_steam_) ->
		steam= _steam_
	it 'steam service should exist', ->
		expect(steam).toBeDefined()

