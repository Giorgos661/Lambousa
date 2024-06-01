const onClickDocument = (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu').forEach((menu) => {
      menu.classList.remove('show')
    })
  }
}

const onClickDropdownToggle = (e) => {
  e.preventDefault()
  const dropdownMenuEl = e.currentTarget.nextElementSibling
  const parentDropdownMenuEl = e.currentTarget.closest('.dropdown-menu')
  const shouldDropdownMenuOpen = !dropdownMenuEl.classList.contains('show')

  const allDropdownMenuEls = document.querySelectorAll('.dropdown-menu')
  allDropdownMenuEls.forEach((eachDropdownMenuEl) => {
    if (parentDropdownMenuEl !== eachDropdownMenuEl) {
      eachDropdownMenuEl.classList.remove('show')
    }
  })

  if (shouldDropdownMenuOpen) {
    dropdownMenuEl.classList.add('show')
  }
}

const initDropdownToggle = () => {
  const dropdownToggleEls = document.querySelectorAll('.dropdown-toggle')
  dropdownToggleEls.forEach((dropdownToggleEl) => {
    const dropdownMenuEl = dropdownToggleEl.nextElementSibling
    dropdownMenuEl.classList.remove('show')
    dropdownToggleEl.removeEventListener('click', onClickDropdownToggle)
  })

  console.log(screen.width)
  if (screen.width <= 1212) {
    console.log('Attaching new events')

    dropdownToggleEls.forEach((dropdownToggleEl) => {
      dropdownToggleEl.addEventListener('click', onClickDropdownToggle)
    })
  }
}

// document.addEventListener('DOMContentLoaded', function () {
//   // const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
//   // dropdownToggles.forEach(toggle => {
//   //     toggle.addEventListener('click', function(event) {
//   //         event.preventDefault();
//   //         const dropdownMenu = this.nextElementSibling;
//   //         // Toggle visibility of the current dropdown menu
//   //         dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
//   //         // Close other dropdown menus
//   //         dropdownToggles.forEach(otherToggle => {
//   //             if (otherToggle !== toggle) {
//   //                 otherToggle.nextElementSibling.style.display = 'none';
//   //             }
//   //         });
//   //     });
//   // });
//   // // Close dropdowns if clicking outside
//   document.addEventListener('click', function (event) {
//     if (!event.target.closest('.dropdown')) {
//       document.querySelectorAll('.dropdown-menu').forEach((menu) => {
//         menu.classList.remove('show')
//       })
//     }
//   })
// })

const initDocumentClickHandler = () => {
  document.removeEventListener('click', onClickDocument)

  if (screen.width <= 1212) {
    document.addEventListener('click', onClickDocument)
  }
}

document.addEventListener('DOMContentLoaded', function () {
  initDocumentClickHandler()
  initDropdownToggle()
})

window.addEventListener('resize', () => {
  initDocumentClickHandler()
  initDropdownToggle()
})
