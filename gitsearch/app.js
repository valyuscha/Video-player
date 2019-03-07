// Init Github
const github = new Github();

// Init UI
const ui = new UI();

// Init search input
const searchInput = document.getElementById('searchUser');

// Add Event Listener
searchInput.addEventListener('keyup', (e) => {
   // Get input text
   const userText = e.target.value;

   if (userText !== '') {
       ui.showLoader();
       // Make http request
       // github.getUser(userText)
       //     .then(user => {
       //         if (user.message === 'Not Found') {
       //             // Show alert
       //             ui.showAlert(`User: ${userText} not found`, 'alert alert-danger');
       //             // Clear profile
       //             ui.clearProfile();
       //             ui.hideLoader();
       //         } else {
       //             // Show Profile
       //             ui.showProfile(user);
       //             ui.clearAlert();
       //         }
       //         return user;
       //     })
       //     .then(github.getRepos.bind(github))
       //     .then(repos => ui.showRepos(repos))
       //     .then(() => ui.hideLoader())
       //     .catch(err => console.log(err));
       github.getUserAsync(userText)
           .then(info => {
               if (info.userData.message === 'Not Found') {
                   // Show alert
                   ui.showAlert(`User: ${userText} not found`, 'alert alert-danger');
                   // Clear profile
                   ui.clearProfile();
                   ui.hideLoader();
               } else {
                   ui.showProfile(info.userData);
                   ui.showRepos(info.reposData);
               }
           })
           .then(() => ui.hideLoader())
   } else {
       // Clear profile
       ui.clearProfile();
   }
});

// async/await
async function getName() {
    // await
    let user = await github.getUser('dmgame');
    let repos = await github.getRepos(user);
    return { user, repos };
}

// console.log(getName());
// getName()
//     .then(value => console.log(value, new Date()));

function request1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({
            data: 'Data',
            makeAnotherRequest: true
        }), 2000);
    });
}

function request2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({
            data: 'Another Data'
        }), 2000);
    });
}

function makeRequests() {

    request1()
        .then(data => {
            if (data.makeAnotherRequest) {
                return request2()
                    .then(moreData => {
                        return moreData;
                    })
            } else {
                return data;
            }
        })
        .then(result => console.log(result))

}

// makeRequests();

async function makeRequest2() {
    // return Promise.reject('error');
    const data = await request1();

    if (data.makeAnotherRequest) {
        const moreData = await request2();
        return moreData;
    } else {
        return data;
    }
}

// makeRequest2()
//     .then(result => console.log(result))
//     .catch(error => console.log(error));

// let data = '{"name": "Denis"}';
//
// try {
//     let json = JSON.parse(data);
//
//     if (!json.age) {
//         throw new Error('Ошибка в данных');
//     }
//
// } catch (err) {
//     console.log(err);
// } finally {
//     console.log('Final');
// }

// console.log('hello');




