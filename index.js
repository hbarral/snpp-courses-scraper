require('custom-env').env()
const request = require('request-promise').defaults({jar: true})
const cheerio = require('cheerio')
const fs = require('fs')
const ObjectsToCsv = require('objects-to-csv')

const urlLogin = process.env.URL_LOGIN
const urlCourses = process.env.URL_COURSES
const username = process.env.USERNAME
const password = process.env.PASSWORD
const courses = []
const model = {
  area: null,
  code: null,
  specialty: null,
  maxNumberStudents: null,
  numberStudents: null,
  startDate: null,
  endDate: null,
}

const login = async () => {
  const options = {
    form: {
      username,
      password,
      btnSubmit: 'Login'
    },
    // headers: {}
    simple: false,
    followAllRedirects: true
  }
  const html = await request.post(urlLogin, options)
  return html
}

const getCourses = async () => {
  const html = await request.get(urlCourses)
  return html
}

async function main () {
  try {
    await login()

    const coursesHtml = await getCourses()
    // fs.writeFileSync('./courses.html', coursesHtml)

    const $ = await cheerio.load(coursesHtml)

    const currentCourses = $('tbody').children()
    currentCourses.each((index, element) => {
      const row = $(element)
      const course = Object.assign({}, model)

      course.area = $(row).children().eq(3).children('span').text()
      course.code = $(row).children().eq(4).children('span').text()
      course.specialty = $(row).children().eq(5).children('span').text()
      course.maxNumberStudents= $(row).children().eq(8).children('span').text()
      course.numberStudents= $(row).children().eq(9).children('span').text()
      course.startDate = $(row).children().eq(19).children('span').text()
      course.endDate = $(row).children().eq(20).children('span').text()

      courses.push(course)
    })

    fs.writeFileSync('./courses.json', JSON.stringify(courses))

    let csv = new ObjectsToCsv(courses)
    await csv.toDisk('./courses.csv');

  } catch(error) {
    console.error(error)
  }
}

main();
