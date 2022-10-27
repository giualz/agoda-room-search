const puppeteer = require('puppeteer')

async function getAgoda() {
    try {
        const url = 'https://www.agoda.com/ibis-styles-lisboa-centro-marques-de-pombal/hotel/lisbon-pt.html?finalPriceView=2&isShowMobileAppPrice=false&cid=1891458&numberOfBedrooms=&familyMode=false&adults=2&children=0&rooms=1&maxRooms=0&checkIn=2022-11-19&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=1&showReviewSubmissionEntry=false&currencyCode=EUR&isFreeOccSearch=false&tag=13e64f0d-813d-5bb4-cd61-5087c6defcdd&isCityHaveAsq=false&los=7&searchrequestid=6bd7fa32-34a9-4b68-8840-6773ad2a7e56'
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(url)

        const getData = await page.evaluate(() => {
            const taxes = typeof document.querySelector('[data-element-name="price-tax-message"]').innerText === 'string' ? 0 : document.querySelector('[data-element-name="price-tax-message"]').innerText

            const data = {
                address: document.querySelector('.HeaderCerebrum__Address').innerText.split(',').slice(0, 3).toString(),
                adults: document.querySelector('[data-selenium="adultValue"]').innerText.split(' ')[0],
                check_in: document.querySelector('[data-selenium="checkInText"]').innerText,
                check_out: document.querySelector('[data-selenium="checkOutText"]').innerText,
                children: document.querySelector('[data-selenium="childValue"]') ? document.querySelector('[data-selenium="childValue"]') : 0,
                country: document.querySelector('.HeaderCerebrum__Address').innerText.split(',')[4].trim(),
                currency: document.querySelector('[data-ppapi="room-price-currency"]').innerText,
                hotel_name: document.querySelector('.HeaderCerebrum__Name').innerText,
                location: document.querySelector('.HeaderCerebrum__Address').innerText.split(',')[3].trim(),
                no_rooms: Number(document.querySelector('[data-selenium="roomValue"]').innerText.split('')[0]),
                price: Number(document.querySelector('[data-ppapi="room-price"]').innerText),
                priceWithTaxes: Number(document.querySelector('[data-ppapi="room-price"]').innerText) + (typeof taxes != 'string' ? taxes : 0),
                taxes: taxes,
                url: window.location.href,
                zip: document.querySelector('.HeaderCerebrum__Address').innerText.split(',')[5].trim()
            }

            return data
        })

        console.log(getData)
        await browser.close()
    } catch (error) {
        console.error(error)
    }
}

getAgoda()