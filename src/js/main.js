// Header fixed
window.onscroll = function () {
  myFunctionSticky()
}

var navbar = document.querySelector("header")
var sticky = navbar.offsetTop

function myFunctionSticky() {
  if (window.pageYOffset < 50) {
    navbar.classList.remove("fixed-header")
  } else {
    navbar.classList.add("fixed-header")
  }
}

// Menu
const btnMenu = document.querySelectorAll(".icon_bars")
const toggleMenuDesktop = document.querySelector(".menu-desktop")
const toggleMenuMoblie = document.querySelector(".menu-moblie")
btnMenu.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("open")
    toggleMenuDesktop.classList.toggle("invisible")
    toggleMenuDesktop.classList.toggle("opacity-0")
    toggleMenuDesktop.classList.toggle("translate-y-4")
    toggleMenuMoblie.classList.toggle("max-h-[100rem]")
  })
})

// San pham
if (document.querySelector(".btn_item_san_pham")) {
  const all_btn_item_content = document.querySelectorAll(
    ".btn_item_san_pham a[data-content]"
  )
  const all_content_san_pham = document.querySelectorAll(
    ".content_san_pham[data-content]"
  )
  const bg_content_san_pham = document.querySelector(
    "section[data-bg-san-pham]"
  )
  all_btn_item_content.forEach((i) => {
    i.addEventListener("click", () => {
      all_btn_item_content.forEach((e) => e.classList.remove("sp_active"))
      i.classList.add("sp_active")
      all_content_san_pham.forEach((z) => {
        z.classList.add("hidden")
        if (z.getAttribute("data-content") === i.getAttribute("data-content")) {
          z.classList.remove("hidden")
          bg_content_san_pham.style.backgroundImage = `url(${i.getAttribute(
            "data-bg"
          )})`
        }
      })
    })
  })

  all_btn_item_content[1].click()
}

// Slide tin tuc
if (document.querySelector(".slide-tin-tuc")) {
  var silde_tin_tuc = new Swiper(".slide-tin-tuc", {
    pagination: {
      el: ".swiper-pagination-tin-tuc",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".next-tin-tuc",
      prevEl: ".prev-tin-tuc",
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      1300: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      800: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      500: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  })
}

if (document.querySelector(".run-number")) {
  function startCounting(element, countEnd) {
    let count = 0

    const updateCount = () => {
      if (count <= countEnd) {
        count++
        element.textContent = count
        requestAnimationFrame(updateCount)
      } else {
        element.textContent = `${countEnd}+`
        cancelAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }

  function handleScroll() {
    const windowHeight = window.innerHeight

    ;[...document.querySelectorAll(".count")].forEach((element) => {
      // Sử dụng destructuring để lấy thuộc tính top
      const { top } = element.getBoundingClientRect()

      if (top < windowHeight && !element.hasStartedCounting) {
        element.hasStartedCounting = true
        const countEnd = parseInt(element.getAttribute("count-end"), 10)
        startCounting(element, countEnd)
      }
    })
  }

  window.addEventListener("scroll", handleScroll)
  window.addEventListener("resize", handleScroll)
}

if (document.querySelector(".banner-slide")) {
  const swiperBanner = new Swiper(".banner-slide", {
    slidesPerView: 1,
    loop: true,
    disableOnInteraction: true,
    speed: 600,
    spaceBetween: 8,
    navigation: {
      nextEl: ".swiper-banner-next",
      prevEl: ".swiper-banner-prev",
    },
    pagination: {
      el: ".swiper-pagination-banner",
      type: "progressbar",
    },
    on: {
      init: function () {
        updateSlideCount(this)
        checkSlideContent(this)
      },
      slideChange: function () {
        updateSlideCount(this)
        checkSlideContent(this)
      },
    },
  })

  function updateSlideCount(swiper) {
    const slideCountElement = document.querySelector(".swiper-slide-count")
    const total = swiper.slides.length
    const current = swiper.realIndex + 1
    slideCountElement.textContent = `${current
      .toString()
      .padStart(2, "0")}/${total.toString().padStart(2, "0")}`
  }

  function checkSlideContent(swiper) {
    var slideIndex = swiper.activeIndex
    var video = swiper.slides[slideIndex].querySelector("video")

    if (video) {
      swiper.autoplay.stop()
      video.onended = function () {
        swiper.autoplay.start()
      }
    } else {
      swiper.autoplay.start()
    }

    var videoExist = swiper.slides[slideIndex].querySelector("video")
    if (videoExist) {
      swiper.autoplay.stop()
      video.currentTime = 0
      video.play()
      video.onended = function () {
        swiper.autoplay.start()
      }
    } else {
      swiper.autoplay.start()
    }
  }
}

if (document.querySelector(".slide-cot-moc")) {
  var slide_cot_moc = new Swiper(".slide-cot-moc", {
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    slidesPerView: 1,
    spaceBetween: 50,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 100,
      },
      1280: {
        slidesPerView: 2,
        spaceBetween: 200,
      },
    },
  })
}

if (document.querySelector(".menu-san-pham")) {
  const allSanPham = document.querySelectorAll(".menu-san-pham > ul > li > a ")
  allSanPham.forEach((i, index) => {
    if (
      window.location.href.includes(i.getAttribute("href")) &&
      i.getAttribute("href")
    ) {
      document
        .querySelectorAll(".menu-san-pham .menu-item-san-pham")
        [index].classList.add("menu-item-san-pham-active")
    }
  })
}

const all_danh_muc_menu = document.querySelectorAll(
  ".menu-desktop-danh-muc ul li"
)
const all_menu_item_danh_muc = document.querySelectorAll(".menu-item-danh-muc")
const all_menu_item_sp = document.querySelectorAll(".menu-item-sp")

all_danh_muc_menu.forEach((i) => {
  i.addEventListener("mouseenter", () => {
    all_menu_item_sp.forEach((d) => {
      d.classList.remove("active-menu")
    })
    all_danh_muc_menu.forEach((e) => {
      e.classList.remove("text-active")
      e.querySelector("a i.fa-chevron-right").classList.remove("-translate-x-5")
    })
    i.classList.add("text-active")
    i.querySelector("a i.fa-chevron-right").classList.add("-translate-x-5")
    all_menu_item_danh_muc.forEach((z) => {
      if (
        z.getAttribute("category") ===
        i.querySelector("a").getAttribute("category")
      ) {
        all_menu_item_danh_muc.forEach((d) => d.classList.remove("active-menu"))
        z.classList.add("active-menu")
      } else {
        z.classList.remove("active-menu")
      }
    })
  })
})

all_menu_item_danh_muc.forEach((i) => {
  i.querySelectorAll("li a").forEach((u) => {
    u.addEventListener("mouseenter", () => {
      i.querySelectorAll("li a").forEach((a) =>
        a.classList.remove("active-bg-menu")
      )
      u.classList.add("active-bg-menu")
      all_menu_item_sp.forEach((z) => {
        if (
          z.getAttribute("category-item") === u.getAttribute("category-item")
        ) {
          all_menu_item_sp.forEach((d) => d.classList.remove("active-menu"))
          z.classList.add("active-menu")
        } else {
          z.classList.remove("active-menu")
        }
      })
    })
  })
})

if (document.querySelector(".fancy-box-img")) {
  const all_item_fancy_box = document.querySelectorAll(".fancy-box-item")

  all_item_fancy_box.forEach((item, index) => {
    // Hide elements if their index is greater than 3
    if (index > 3) {
      item.classList.add("hidden")
    }
  })

  if (all_item_fancy_box.length > 4) {
    const fourthAnchor = all_item_fancy_box[3].querySelector("a")
    fourthAnchor.classList.add("box-bg")
    fourthAnchor.style.setProperty(
      "--before-content",
      `'${all_item_fancy_box.length - 3}+'`
    )
  }

  // Bind Fancybox to elements with data-fancybox="gallery-a"
  Fancybox.bind('[data-fancybox="gallery-a"]', {
    // Custom options for the first gallery
  })
}
