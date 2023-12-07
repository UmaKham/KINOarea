let box = document.querySelector('.box')

let settings_btn = document.querySelector('.settings')
let settings_box = document.querySelector('.user_settings_box')

settings_btn.onclick = () => {
  document.querySelector('.user_section').classList.add('hide')
  settings_box.classList.remove('hide')
  console.log(settings_box);
}

let save_btn = document.querySelector('.user_settings_box button')
console.log(save_btn);
save_btn.onclick = () => {
  document.querySelector('.user_section').classList.remove('hide')
  settings_box.classList.add('hide')
}