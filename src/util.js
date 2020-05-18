export const randomNum = (min, max) => {
  if(min >= max) {
    throw Error('Min must be less than max')
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getFullName = (firstName, middleName, lastName) => {
  return middleName ?
    `${firstName} ${middleName} ${lastName}` :
    `${firstName} ${lastName}`
}

export const getParentage = (motherName, fatherName, gender, locale) => {
  let childTitles = {
    "en": {
      "son": " son",
      "daughter": " daughter"
    },
    "es": {
      "son": " hijo",
      "daughter": " hija"
    }
  }

  let parentage = ","
  let father = fatherName !== ""
  let mother = motherName !== ""
  let child = gender  ? childTitles[locale]["son"] : childTitles[locale]["daughter"]

  // We'll immediately omit this line if there are no parents listed
  if (!father && !mother) {
    return ""
  }
  switch (locale) {
    case "en":
      parentage += child + ' of '
      parentage += father && mother ? fatherName + ' and ' + motherName : fatherName + motherName
      parentage += ","
      break;
    case "es":
      parentage += child + ' de '
      // In Spanish, "y" changes to "e" before a "y" or "i"
      let joiner = /^(Y|I).*/i.test(motherName) ? " e " : " y "
      parentage += father && mother ? fatherName + joiner + motherName : fatherName + motherName
      parentage += ","
      break;
    default:
      break;
  }
  return parentage
}

export const splitBlessing = (blessing) => {
  // trim off initial and final whitespace, and remove new lines
  let blessingTrimmed = blessing.trim().replace(/\n+/g, '')
  // extract first letter
  let firstLetter = blessingTrimmed.substr(0, 1)
  blessingTrimmed = blessingTrimmed.substring(1)
  // split the verses on punctuation
  let verses = blessingTrimmed.match(/[^.!?]+[.!?]+/g)
  // group sentences together to make longer verses
  let longerVerses = [],
    index = 0
  if (verses) {
    while (index < verses.length) {
      // grab a random number 2-3 for verse length
      let random = randomNum(2, 3)
      //pull verses in, join, and add to array
      longerVerses.push(verses.slice(index, index + random).join(' '))
      // move down the array
      index += random
    }
    // trim verse and add verse numbers to all except first verse
    longerVerses = longerVerses.map((verse, i) => {
      if (i === 0) {
        return verse.trim()
      } else {
        return i + 1 + '. ' + verse.trim()
      }
    })
  } else { // mainly for testing purposes; triggered if there is no punctuation
    longerVerses = [blessingTrimmed]
  }
  return [firstLetter, longerVerses];
}

export const getMemberTitle = (gender, locale) => {
  /* This will be preceded by the language's word for "to"*/
const titles = {
  "en": { // to...
    "brother": " Brother",
    "sister": " Sister"
  },
  "es": { // a...
    "brother": "l Hermano",
    "sister": " la Hermana"
  }
}

  return gender ? titles[locale]["brother"] : titles[locale]["sister"]
}

export const preparePacket = data => {
  const [blessingFirstLetter, blessing] = splitBlessing(data.blessing)
  return {
    firstName: data.firstName.toUpperCase(),
    lastName: data.lastName,
    fullName: getFullName(data.firstName, data.middleName, data.lastName),
    patriarch: data.patriarch,
    stake: data.stake,
    parentage: getParentage(data.mother, data.father, data.gender, data.locale),
    blessingFirstLetter,
    blessing,
    memberTitle: getMemberTitle(data.gender, data.locale),
    blessingDate: data.date,
    template: data.locale,
    locale: data.locale
  }
}
