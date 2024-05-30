// const puppeteer = require('puppeteer');
const profileLinks=document.querySelector('.profileLinks');
const scrapeButton=document.querySelector('#scrapeButton');

scrapeButton.addEventListener('click',async(ev)=>{
    const links=profileLinks.value;
    const linkArr=links.split('\n');
    // console.log(linkArr);
    await axios.post('/linkhandle',{
        linkArr: linkArr
    })
    .then(async function (response) {
        console.log("Response dekhte hai");
        console.log(response.data);
        console.log("Location: ",response.data.followerConnectionLocation[0]);
        console.log("Followers: ",response.data.followerConnectionLocation[2].trim());
        console.log("Connections: ",response.data.followerConnectionLocation[3].trim());
        console.log("Name: ",response.data.name[0].trim());
        console.log("URL: ",response.data.url.split('?')[0]);
        console.log("Bio: ",response.data.bio[0].trim());
        console.log("About: ",response.data.about[0].trim());
        console.log(response);

        return await axios.post('/dataHandle',{
            name: name,
            bio: bio,
            location: location,
            followers: followers,
            connections: connections,
            about: about,
            url: url
        })
    })
    .catch(function (error) {
        console.log(error);
    });
})