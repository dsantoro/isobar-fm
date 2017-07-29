const axios = require('axios');

const ISOBARBANDS = 'https://iws-recruiting-bands.herokuapp.com/api/bands';

function getRequest() {

     return axios.get(ISOBARBANDS).then(function (res) {
        if(res.data.cod && res.data.message) {
            throw new Error(res.data.message);
        } else {
            return res.data;
        }
    }, function (res){
        throw new Error(res.data.message);
    });
}

export default getRequest;
