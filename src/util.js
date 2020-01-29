const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getFullName = (firstName, middleName, lastName) => {
  return middleName ?
    `${firstName} ${middleName} ${lastName}` :
    `${firstName} ${lastName}`
}

const getParentage = (motherName, fatherName, gender) => {
  let parentage = ","
  let father = fatherName !== ""
  let mother = motherName !== ""
  let child = gender === "Female" ? ' daughter' : ' son'

  if (!father && !mother) {
    return ""
  }
  parentage += child + ' of '
  parentage += father && mother ? fatherName + ' and ' + motherName : fatherName + motherName
  return parentage
}

const splitBlessing = (blessing) => {
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

const getMemberTitle = (gender) => {
  return gender === 'Female' ? ' Sister' : ' Brother'
}

export const preparePacket = data => {
  console.log(`Preparing packet`)
  console.table(data)
  const [blessingFirstLetter, blessing] = splitBlessing(data.blessing)
  return {
    firstName: data.firstName.toUpperCase(),
    lastName: data.lastName,
    fullName: getFullName(data.firstName, data.middleName, data.lastName),
    patriarch: data.patriarch,
    stake: data.stake,
    parentage: getParentage(data.mother, data.father, data.gender),
    blessingFirstLetter,
    blessing,
    memberTitle: getMemberTitle(data.gender),
    blessingDate: data.date,
    template: `en`
  }
}