module.exports = function admin() {
    let user = 'show';
    let post= 'hidden';
    let update= 'hidden';
    let register = 'hidden'
    let update_in = 'hidden'
    
    function resetadmin() {
            user = 'show';
         post= 'hidden';
         update= 'hidden';
         register = 'hidden'
         update_in = 'hidden'
    }
    function showuser() {
        user = 'show'
        post = 'hidden'
        update = 'hidden'
        register = 'hidden'
        update_in = 'hidden'
    }

    function returnuser() {
        return user
    }
    function showpost() {
        user = 'hidden'
        post = 'show'
        update = 'hidden'
        register = 'hidden'
        update_in = 'hidden'
    }

    function returnpost() {
        return post
    }

    function showupdate() {
        user = 'hidden'
        post = 'hidden'
        update = 'show'
        register = 'hidden'
        update_in = 'hidden'
    }

    function returnupdate() {
        return update
    }
    function showregister() {
        
        user = 'show'
        post = 'hidden'
        update = 'hidden'
        update_in = 'hidden'
        register = 'show'
    }
    function returnregister() {
        return register
    }
    function showupdate_input() {
        user = 'hidden'
        post = 'hidden'
        update = 'show'
        update_in = 'show'
        register = 'hidden'
    }
    function returnupdate_input() {
        return update_in
    }
    
    return{
        showuser,
        showpost,

        showupdate,
        returnuser,

        returnpost,
        returnupdate,

        showregister,
        returnregister,
        showupdate_input,
        returnupdate_input,
        resetadmin
    }
}