let box = document.querySelector('.box')

let settings_btn = document.querySelector('.settings')
let save_btn = document.querySelector('.user_settings_box button')
let friend_btn = document.querySelector('.friend')

let user_section = document.querySelector('.user_section')
let settings_box = document.querySelector('.user_settings_box')
let friend_section = document.querySelector('.friend_section')


let sidebar_btn_active = document.querySelectorAll('.sidebar ul li')
for(let btn of sidebar_btn_active) {
  btn.onclick = () => {
    let remove_active = document.querySelector('.sidebar ul .active')
    remove_active.classList.remove('active')
    
    if(btn.classList !== 'active') {
      if(btn.classList == 'friend') {
        friend_section.classList.remove('hide')
        user_section.classList.add('hide')
  
        btn.classList.add('active')
      }
      if(btn.classList == 'home') {
        friend_section.classList.add('hide')
        user_section.classList.remove('hide')
      }
    } 
  }
}

settings_btn.onclick = () => {
  user_section.classList.add('hide')
  settings_box.classList.remove('hide')
  console.log(settings_box);
}

save_btn.onclick = () => {
  user_section.classList.remove('hide')
  settings_box.classList.add('hide')
}