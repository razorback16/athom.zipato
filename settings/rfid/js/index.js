(function(app) {

	/**
	 * init users
	 */
	function loadUsers()
	{
		// get users
		var users = app.userRepository.getAllUsers();

		// check if users is loaded
		if (users.length === 0) {
			document.getElementById('userList').innerText = __('settings.rfid.messages.noUserssYet');
			return;
		}

		// clear previous users
		document.getElementById('userList').innerHTML = '';

		// load users
		for (var i=0; i<users.length; i++) {
			var user = users[i];
			var rows = new Array();

			//add name
			rows.push({
				label: __('settings.systemEventLog.table.person'),
				value: user.name
			});

			//add status
			rows.push({
				label: __('settings.users.table.status'),
				value: __('settings.systemEventLog.eventTypes.s' + user.statusCode)
			});

			//add status
			rows.push({
				label: __('settings.users.table.tags'),
				value: app.tagRepository.getTagNames(user.tagIds).join(', ')
			});

			//add edit button
			var editButton = document.createElement("button");
			editButton.className = 'hy-nostyle full-width';
			editButton.innerText = __('settings.users.table.edit');
			editButton.user = user;
			editButton.onclick = function() {
				app.page.open('rfid/user.html', 'rfid/js/user.js', {user: this.user});
			}

			document.getElementById('userList').appendChild(app.ui.createTable(rows, {editButton: editButton}));
		}
	}

	function onRepositoryLoaded(name) {
		if (name == 'userContainer' || name == 'tagContainer') {
			loadUsers();
		}
	}

	// bind global events
	app.event.on('repository.loaded', onRepositoryLoaded);

	// init load users
	loadUsers();

	return {
		destroy: function() {
			app.event.off('repository.loaded', onRepositoryLoaded);
		}
	};
});