module.exports = function admin() {
    let user = 'show';
    let post= 'hidden';
    let update= 'hidden';
    
    
    function showuser() {
        user = 'show'
        post = 'hidden'
        update = 'hidden'
    }

    function returnuser() {
        return user
    }
    function showpost() {
        user = 'hidden'
        post = 'show'
        update = 'hidden'
    }

    function returnpost() {
        return post
    }

    function showupdate() {
        user = 'hidden'
        post = 'hidden'
        update = 'show'
    }

    function returnupdate() {
        return update
    }
    
    return{
        showuser,
        showpost,
        showupdate,
        returnuser,
        returnpost,
        returnupdate
    }
}