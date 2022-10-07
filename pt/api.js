const request = require('request-promise');

class pteroapi {

    /** 
     * contruir a api
     * @param {String} apiurl - url
     * @param {String} apitoken - token
    */

    ct(apiurl, apitoken) {
        if(!apiurl || !apitoken) throw new Error("seu url ou keyapi esta invalida ou errada");
        this.url = apiurl;
        this.token = apitoken;
        this.header = {
            auth: {
                bearer: this.token
            },
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.pterodactyl.v1+json'
        };
    }
    /**
    * fuções do cliente
    */

    getallservers() {
        return new Promise(async (resolve, reject) => {
            const url = this.url+'/api/application/servers';
            try {
                const resp = request.get(url, {auth:{bearer:this.token},json: true,resolveWithFullResponse: true})
                if (resp.statusCode !== 200) reject(new Error(`Non-200 status code ${resp.statusCode}`));
                if (resp.body.error) reject(new Error(`Error: ${resp.body.error}`));
                resolve(resp.body.data);
            }catch (er) {
                reject(er);
            }
        })
    }
}