const form = document.forms[0] 
form.addEventListener('submit', (e) => { 
    e.preventDefault() 
    const userData = new FormData() 
    Array.from(form).forEach((el) => { 
        if (el.name && el.value !== '') {
            userData.append([el.name], el.value)
        }
    }) 
    fetch("php/mail.php", { 
            method: "POST",
            body: userData
        })
        .then(response => {
            if (response.status !== 201 && response.status !== 403) { 
                return Promise.reject();
            }
            return response.json();
        })
    .then(function (data) {
            alert(data.message) 
        })
        .catch((e) =>
            console.log('ошибка сервера')); 
});
