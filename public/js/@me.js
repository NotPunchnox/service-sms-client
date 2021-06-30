const discord = document.getElementById('Discord'),
    token = localStorage.getItem('token')


discord.addEventListener('click', function (e) {
    e.preventDefault()
    var request = new Request('http://localhost:3000/sms/payment', {
        method: 'POST',
        body: JSON.stringify({
            'service': String(document.getElementById('Discord').id),
            'service': String(document.getElementById('Discord').id)
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            'token': token
        })
    })
    console.log(request)
    fetch(request).then(resp => resp.json().then(r => {
        window.location = r.message.link
    })).catch(err => console.error(err))
})

document.getElementById('Steam').addEventListener('click', function (e) {
    e.preventDefault()
    var request = new Request('http://localhost:3000/sms/payment', {
        method: 'POST',
        body: JSON.stringify({
            'service': 'Steam'
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            'token': token
        })
    })
    fetch(request).then(resp => resp.json().then(r => {
        window.location = r.message.link
    })).catch(err => console.error(err))
})

document.getElementById('Uber').addEventListener('click', function (e) {
    e.preventDefault()
    var request = new Request('http://localhost:3000/sms/payment', {
        method: 'POST',
        body: JSON.stringify({
            'service': 'Uber'
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            'token': token
        })
    })
    fetch(request).then(resp => resp.json().then(r => {
        window.location = r.message.link
    })).catch(err => console.error(err))
})


document.getElementById('Tinder').addEventListener('click', function (e) {
    e.preventDefault()
    var request = new Request('http://localhost:3000/sms/payment', {
        method: 'POST',
        body: JSON.stringify({
            'service': 'Tinder'
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            'token': token
        })
    })
    fetch(request).then(resp => resp.json().then(r => {
        window.location = r.message.link
    })).catch(err => console.error(err))
})

document.getElementById('Apple').addEventListener('click', function (e) {
    e.preventDefault()
    var request = new Request('http://localhost:3000/sms/payment', {
        method: 'POST',
        body: JSON.stringify({
            'service': 'Apple'
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            'token': token
        })
    })
    fetch(request).then(resp => resp.json().then(r => {
        window.location = r.message.link
    })).catch(err => console.error(err))
})

document.getElementById('Snapchat').addEventListener('click', function (e) {
    e.preventDefault()
    var request = new Request('http://localhost:3000/sms/payment', {
        method: 'POST',
        body: JSON.stringify({
            'service': 'Snapchat'
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            'token': token
        })
    })
    fetch(request).then(resp => resp.json().then(r => {
        window.location = r.message.link
    })).catch(err => console.error(err))
})

document.getElementById('Aliexpress').addEventListener('click', function (e) {
    e.preventDefault()
    var request = new Request('http://localhost:3000/sms/payment', {
        method: 'POST',
        body: JSON.stringify({
            'service': 'Aliexpress'
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            'token': token
        })
    })
    fetch(request).then(resp => resp.json().then(r => {
        window.location = r.message.link
    })).catch(err => console.error(err))
})

console.log(data)

const f = (d) => {
    let h = d.getHours();
    let m = d.getMinutes();
    const ampm = h >= 12 ? 'pm' : 'am';

    h %= 12;
    h = h || 12;
    m = m < 10 ? `0${m}` : m;

    const strTime = `${h}:${m} ${ampm}`;

    return strTime;
};


if (JSON.parse(JSON.stringify(data)).user.approuved.length !== 0) {

    const app = JSON.parse(JSON.stringify(data)).user.approuved

    app.forEach(a => {

        let c = JSON.parse(JSON.stringify(data)).user.pending.find(b => b.id === a.id)
        if (!c) return;
        const log = document.createElement('div')

        log.innerHTML = `<div class="payementservice">
                <img class="payementlogo" src="images/logopaypal.png" alt="Logo Payement">
                <p class="nomduservice">${c.service}</p>
                <p class="tempsdelachat">${f(new Date(a.create_time))}</p>
                <p class="prixduservice">${c.price}EUR</p>
            </div>`
        document.getElementById('logs').appendChild(log)

    })

}

if (JSON.parse(JSON.stringify(data)).user.messages.length !== 0) {

    const msg = JSON.parse(JSON.stringify(data)).user.messages
    
    msg.forEach(a => {

        const list = document.createElement('div')

        if (a.service === 'SYSTEM') {
            let message = a.text.split(String('\\n'))
            list.innerHTML = `<div class="notifications">
                    <img class="newnumber" src="./images/notification.png" alt="${ a.service }">
                    <p class="nomservice">New Number</p>
                    <p class="tempsdumessagenumber">${f(new Date(a.createdAt))}</p>
                    <div class="infonewnumber">
                        <p class="debutl">Country : <span class="finl">Russia</span></p><br>
                        <p class="debutl">Number : <span class="finl">+7</span></p><br>
                        <p class="debutl">Phone : <span class="finl">${ message[2].split('number: +7').slice(1) }</span></p><br>
                        <p class="debut2">Invalid phone number? contact support: discord.gg/punchnox</span></p><br>
                    </div>
                </div>`
        } else {
            list.innerHTML = `<div class="notifications">
                    <img class="logoduservice" src="./images/${ a.service }.png" alt="logo">
                    <p class="nomservice">${ a.service } : ${ a.number }</p>
                    <p class="tempsdumessage" style="left: 260px">${f(new Date())}</p>
                    <p class="messageverif">${ a.text }</p>
                </div>`
        }
        document.getElementById('section2').appendChild(list)

    })

}

if (JSON.parse(JSON.stringify(data)).user.phone.length !== 0) {

    const phone = JSON.parse(JSON.stringify(data)).user.phone

    phone.forEach(a => {
        request = new Request('http://localhost:3000/sms/' + a.tzid, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            })
        })
        fetch(request).then(resp => resp.json().then(r => {

            if (r.code === 201) {
                r.message.msg.forEach(c=> {

                    let list = document.createElement('div')
                    if(!JSON.parse(JSON.stringify(data)).user.messages.find(d=> d.service !== 'SYSTEM' && d.code === c.code)) {
    
                    list.innerHTML = `<div class="notifications">
                        <div class="notifs">
                            <img class="logoduservice" src="./images/${r.message.service}.png" alt="logo">
                            <p class="nomservice">${ r.message.service } : ${ r.message.number }</p>
                            <p class="tempsdumessage" style="left: 260px">${f(new Date())}</p>
                            <p class="messageverif">${ c.text }</p>
                        </div>
                    </div>`
                    document.getElementById('section2').appendChild(list)
                    document.getElementById('section2').scrollTop = document.getElementById('section2').scrollHeight

                    }

                })

            } else return;
        }))

    })

}