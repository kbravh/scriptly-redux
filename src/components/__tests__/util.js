import * as util from '../../util'

describe('Random Number generator', () => {
  it('rejects a min higher than the max', () => {
    // make sure to not call the function directly, or else the error will happen before jest expects it to
    expect(() => util.randomNum(5, 4)).toThrow('Min must be less than max')
  })
})

describe('Full Name', () => {
  it('generates full name', () => {
    expect(util.getFullName('Karey', 'Bravo', 'Higuera')).toBe('Karey Bravo Higuera')
  })
  it('generates first and last name', () => {
    expect(util.getFullName('Karey', '', 'Higuera')).toBe('Karey Higuera')
  })
})

describe('Parentage', () => {
  //English
  it('generates for english female - no parents', () => {
    expect(util.getParentage('', '', false, 'en')).toBe('')
  })
  it('generates for english male - no parents', () => {
    expect(util.getParentage('', '', true, 'en')).toBe('')
  })
  it('generates for english female - mother', () => {
    expect(util.getParentage('Jane Doe', '', false, 'en')).toBe(', daughter of Jane Doe,')
  })
  it('generates for english male - mother', () => {
    expect(util.getParentage('Jane Doe', '', true, 'en')).toBe(', son of Jane Doe,')
  })
  it('generates for english female - father', () => {
    expect(util.getParentage('', 'John Doe', false, 'en')).toBe(', daughter of John Doe,')
  })
  it('generates for english male - father', () => {
    expect(util.getParentage('', 'John Doe', true, 'en')).toBe(', son of John Doe,')
  })
  it('generates for english female - both parents', () => {
    expect(util.getParentage('Jane Doe', 'John Doe', false, 'en')).toBe(', daughter of John Doe and Jane Doe,')
  })
  it('generates for english male - both parents', () => {
    expect(util.getParentage('Jane Doe', 'John Doe', true, 'en')).toBe(', son of John Doe and Jane Doe,')
  })
  // Spanish
  it('generates for spanish female - no parents', () => {
    expect(util.getParentage('', '', false, 'es')).toBe('')
  })
  it('generates for spanish male - no parents', () => {
    expect(util.getParentage('', '', true, 'es')).toBe('')
  })
  it('generates for spanish female - mother', () => {
    expect(util.getParentage('Maria Morales Montes', '', false, 'es')).toBe(', hija de Maria Morales Montes,')
  })
  it('generates for spanish male - mother', () => {
    expect(util.getParentage('Maria Morales Montes', '', true, 'es')).toBe(', hijo de Maria Morales Montes,')
  })
  it('generates for spanish female - father', () => {
    expect(util.getParentage('', 'Juan Valenzuela Cortéz', false, 'es')).toBe(', hija de Juan Valenzuela Cortéz,')
  })
  it('generates for spanish male - father', () => {
    expect(util.getParentage('', 'Juan Valenzuela Cortéz', true, 'es')).toBe(', hijo de Juan Valenzuela Cortéz,')
  })
  it('generates for spanish female - both parents', () => {
    expect(util.getParentage('Maria Morales Montes', 'Juan Valenzuela Cortéz', false, 'es')).toBe(', hija de Juan Valenzuela Cortéz y Maria Morales Montes,')
  })
  it('generates for spanish male - both parents', () => {
    expect(util.getParentage('Maria Morales Montes', 'Juan Valenzuela Cortéz', true, 'es')).toBe(', hijo de Juan Valenzuela Cortéz y Maria Morales Montes,')
  })
  it('generates for spanish male - both parents, mother name with Y', () => {
    expect(util.getParentage('Ygnacia Morales Montes', 'Juan Valenzuela Cortéz', true, 'es')).toBe(', hijo de Juan Valenzuela Cortéz e Ygnacia Morales Montes,')
  })
  it('generates for spanish male - both parents, mother name with I', () => {
    expect(util.getParentage('Ignacia Morales Montes', 'Juan Valenzuela Cortéz', true, 'es')).toBe(', hijo de Juan Valenzuela Cortéz e Ignacia Morales Montes,')
  })
})

describe('Member Title', () => {
  // English
  it('generates english female title', () => {
    expect(util.getMemberTitle(false, 'en')).toBe(' Sister')
  })
  it('generates english male title', () => {
    expect(util.getMemberTitle(true, 'en')).toBe(' Brother')
  })
  //Spanish
  it('generates spanish female title', () => {
    expect(util.getMemberTitle(false, 'es')).toBe(' la Hermana')
  })
  it('generates spanish male title', () => {
    expect(util.getMemberTitle(true, 'es')).toBe('l Hermano')
  })
})