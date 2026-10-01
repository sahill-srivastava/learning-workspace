const characterSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}?',
}

function randomIndex(max) {
  const range = 0x100000000
  const limit = range - (range % max)
  const value = new Uint32Array(1)

  do {
    globalThis.crypto.getRandomValues(value)
  } while (value[0] >= limit)

  return value[0] % max
}

function shuffle(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const otherIndex = randomIndex(index + 1)
    ;[items[index], items[otherIndex]] = [items[otherIndex], items[index]]
  }
  return items
}

function normalizeName(name, options, allCharacters) {
  const normalizedName = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase()

  return Array.from(normalizedName, (character) => {
    if (/[a-z]/.test(character)) {
      if (options.lowercase) return character
      if (options.uppercase) return character.toUpperCase()
    } else if (options.numbers) {
      return character
    }

    return allCharacters[character.charCodeAt(0) % allCharacters.length]
  }).join('')
}

export function generatePassword(name, length, options) {
  const enabledSets = Object.entries(characterSets)
    .filter(([key]) => options[key])
    .map(([, characters]) => characters)

  if (!enabledSets.length) {
    throw new Error('Choose at least one character type.')
  }

  const allCharacters = enabledSets.join('')
  const normalizedName = normalizeName(name, options, allCharacters)
  const namePart = normalizedName.slice(0, Math.max(1, Math.min(normalizedName.length, length - enabledSets.length)))
  const randomPart = []

  enabledSets.forEach((set) => {
    randomPart.push(set[randomIndex(set.length)])
  })

  while (namePart.length + randomPart.length < length) {
    randomPart.push(allCharacters[randomIndex(allCharacters.length)])
  }

  return namePart + shuffle(randomPart).join('')
}

export function getStrength(length, options, name = '') {
  const enabledSets = Object.entries(characterSets)
    .filter(([key]) => options[key])
    .map(([, characters]) => characters)
  const poolSize = enabledSets.reduce((total, characters) => total + characters.length, 0)
  const nameLength = normalizeName(name, options, enabledSets.join('')).length
  const randomLength = Math.max(0, length - Math.min(nameLength, length - enabledSets.length))
  const entropy = poolSize ? randomLength * Math.log2(poolSize) : 0

  if (entropy >= 90) return { label: 'Excellent', percent: 100 }
  if (entropy >= 65) return { label: 'Strong', percent: 78 }
  if (entropy >= 40) return { label: 'Fair', percent: 52 }
  return { label: 'Weak', percent: 25 }
}
