// Menu
const btnMenu = document.querySelectorAll(".icon_bars")
const toggleMenu = document.querySelector(".menu-desktop")
btnMenu.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("open")
    toggleMenu.classList.toggle("invisible")
    toggleMenu.classList.toggle("opacity-0")
    toggleMenu.classList.toggle("translate-y-4")
  })
})

// San pham
if (document.querySelector(".btn_item_san_pham")) {
  const btn_item_content = document.querySelector(".btn_item_san_pham")
  const content_san_pham = document.querySelector(".content_san_pham")
  let name_item_content = [
    "Keo Công Nghiệp",
    "Hóa chất cho sơn nước",
    "Bột màu & phẩm nhuộm",
    "Hóa chất cho dệt nhuộm",
    "Hóa chất cho in Vải",
    "Hóa chất khác",
  ]

  let loremIpsums = [
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, minus? Sint iste impedit cum! Pariatur quidem, explicabo deserunt unde sint rerum. Qui distinctio, vitae, doloremque quo vero error adipisci soluta maxime eius aliquid illo, et perspiciatis accusantium possimus amet consectetur?",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque odit commodi voluptas dolorem ipsum molestias, accusantium aspernatur veniam, dolor temporibus, unde consequatur consequuntur itaque? Eveniet, beatae natus culpa cum fugit enim, minus magnam earum incidunt repudiandae voluptatem inventore dolorem tempore.",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium qui, cum asperiores illo quaerat amet esse! Quibusdam eius quasi cupiditate reprehenderit deserunt qui accusamus veniam, voluptatem quos sapiente atque a? Voluptatibus omnis atque, maxime esse incidunt eligendi tempore earum blanditiis.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, voluptate error odit repudiandae nulla quasi aperiam atque quisquam repellat sint quam iusto eos a aliquid nesciunt! Ipsa expedita perspiciatis natus eveniet atque, architecto, odio esse explicabo optio, nisi blanditiis alias?",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint iste saepe laboriosam non, ex neque magni quidem minus ullam. Unde deserunt aspernatur commodi tenetur, iure veniam excepturi doloribus dignissimos ipsam voluptates nihil deleniti nobis nesciunt voluptatem repellat in sint labore.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, quod. Consequuntur ut commodi, quo praesentium non nostrum id ipsum earum doloribus cupiditate et laborum quaerat sapiente cumque repellat laudantium fugiat alias iste magnam, harum maiores natus accusantium. Dolorum, facilis quidem!",
  ]

  name_item_content.forEach((i, index) => {
    btn_item_content.innerHTML += `<span onclick='handleClickItemContent(${index})'>${i}</span>`
  })

  let form_content = (index) => {
    return `
  <p class="text-[1.4rem] font-semibold uppercase">
    ${name_item_content[index]}
  </p>
  <span class="block w-3/5 h-[0.5px] bg-white"></span>
  <p>
      ${loremIpsums[index]}
  </p>
`
  }

  function handleClickItemContent(index) {
    btn_item_content
      .querySelectorAll("span")
      .forEach((i) => i.classList.remove("sp_active"))
    btn_item_content.querySelectorAll("span")[index].classList.add("sp_active")
    content_san_pham.innerHTML = form_content(index)
  }

  handleClickItemContent(1)
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
  // Hàm kiểm tra xem phần tử có trong tầm nhìn của người dùng không
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // Lấy tất cả các phần tử có class là "count"
  const countElements = document.querySelectorAll(".count")

  // Duyệt qua mỗi phần tử
  countElements.forEach((element) => {
    let hasStartedCounting = false // Biến để kiểm tra xem đã bắt đầu đếm chưa
    const countEnd = parseInt(element.getAttribute("count-end"))
    let count = 0

    // Hàm đếm số
    function startCounting() {
      const interval = setInterval(
        () => {
          element.textContent = count
          count++

          // Dừng khi đạt đến giá trị "count-end"
          if (count > countEnd) {
            clearInterval(interval)
            element.textContent = countEnd
            element.textContent += "+"
          }
        },
        countEnd > 100 ? 20 : 35
      )
    }

    // Kiểm tra khi cuộn trang
    window.addEventListener("scroll", function () {
      if (!hasStartedCounting && isElementInViewport(element)) {
        hasStartedCounting = true
        startCounting()
      }
    })
  })
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
    })
    i.classList.add("text-active")
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
