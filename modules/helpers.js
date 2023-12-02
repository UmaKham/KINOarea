import axios from 'axios'

const base_url = 'https://api.themoviedb.org/3'

export const getData = async (resource) => {
    try{
        const res = await axios(base_url + resource, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDdkYjI2YTMwNWZhZDE2MDFmY2UzYWI1NDBhZmQ5NSIsInN1YiI6IjY1NWQxNTkwZjY3ODdhMDBlMzBkMjE5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PmOBAxI_5U6vmBOWa7ARwi3R9flp66lG3AXMg2PXEKc`
            }
        })
        
        return res
    } catch(e) {
        console.log(e);
    }
}