const ROOT = 'https://jsonplaceholder.typicode.com';

class SampleService {
  static instance;

  static get shared() {
    if( this.instance ) {
      return this.instance;
    }

    this.instance = new SampleService();
    return this.instance;
  }

  async getData( rest ) {
    const url = ROOT + rest;

    const headers = new Headers();
    // headers.append("Authorization", "Bearer " + airtableServiceKey);
    
    const request = {
      method: 'GET',
      headers: headers
    }

    const result = await fetch( url, request )
    .then( ( response ) => {
      if( !response.ok ) {
        return null;
      }

      const totalCount= response.headers.get('x-total-count');

      const objRet = response.json().then( ( json ) => {
        return {
          totalCount: totalCount,
          list: json
        }
      });

      return objRet;
    })
    .catch( ( error ) => {
      console.log('error: ' + error.message);
      return null;
    });

    return result
  } 
}

export default SampleService;