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
  it('generates for female - no parents', () => {
    expect(util.getParentage('', '', false)).toBe('')
  })
  it('generates for male - no parents', () => {
    expect(util.getParentage('', '', true)).toBe('')
  })
  it('generates for female - mother', () => {
    expect(util.getParentage('Jane Doe', '', false)).toBe(', daughter of Jane Doe')
  })
  it('generates for male - mother', () => {
    expect(util.getParentage('Jane Doe', '', true)).toBe(', son of Jane Doe')
  })
  it('generates for female - father', () => {
    expect(util.getParentage('', 'John Doe', false)).toBe(', daughter of John Doe')
  })
  it('generates for male - father', () => {
    expect(util.getParentage('', 'John Doe', true)).toBe(', son of John Doe')
  })
  it('generates for female - both parents', () => {
    expect(util.getParentage('Jane Doe', 'John Doe', false)).toBe(', daughter of John Doe and Jane Doe')
  })
  it('generates for male - both parents', () => {
    expect(util.getParentage('Jane Doe', 'John Doe', true)).toBe(', son of John Doe and Jane Doe')
  })
})

describe('Member Title', () => {
  it('generates title for female', () => {
    expect(util.getMemberTitle(false)).toBe(' Sister')
  })
  it('generates title for male', () => {
    expect(util.getMemberTitle(true)).toBe(' Brother')
  })
})