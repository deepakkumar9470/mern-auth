
export default authHeader = () => {
    
    const token = JSON.parse(localStorage.getItem('jwtoken'));

    if(token){
        return {
            Authorization : 'Bearer' + token
        }
    }

    return {}
};