$(() => {
    $('.change-devoured').on('click', (event) => {
        let id = $(this).data('id');
        let newDevour = $(this).data('newdevour');

        var newDevourState = {
            devoured: newDevour
        };

        // Send the PUT request.
        $.ajax(`/api/burgers/${id}`, {
            type: 'PUT',
            data: newDevourState
        }).then(() => {
            console.log(`changed devoured to ${newDevour}`);
            // Reload the page to get the updated list
            location.reload();
        }
        );
    });

    $('.create-form').on('submit', (event) => {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        let newBurger = {
            burger_name: $('#burger').val().trim(),
            devoured: $('[name=devoured]:checked').val().trim()
        };

        // Send the POST request.
        $.ajax('/api/burgers', {
            type: 'POST',
            data: newBurger
        }).then(() => {
            console.log('created new burger');
            // Reload the page to get the updated list
            location.reload();
        }
        );
    });

    $('.delete-burger').on('click', (event) => {
        let id = $(this).data('id');

        // Send the DELETE request.
        $.ajax(`/api/burgers/${id}`, {
            type: 'DELETE'
        }).then(() => {
            console.log(`deleted burger ${id}`);
            // Reload the page to get the updated list
            location.reload();
        }
        );
    });
});