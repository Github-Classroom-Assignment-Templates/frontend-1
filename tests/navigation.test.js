import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    container = dom.window.document
  })


  it('has en lang attribute on html tag', () => {
    expect(container.getElementsByTagName("html")[0].getAttribute("lang")).toBe('en')
  })

  it('has utf-8 charset attribute on meta element', () => {
    expect(container.querySelector('meta')).not.toBeNull()
    expect(container.querySelector('meta').getAttribute('charset')).toBe('utf-8')
  })

  it('renders the assignment name in the title', () => {
    expect(container.querySelector('title')).not.toBeNull()
    expect(container.querySelector('title').text).toBe('HTML Assignment')
  })

  it('renders a heading element with text Heading', () => {
    expect(container.body.querySelector('h1')).not.toBeNull()
    expect(container.querySelector('h1').textContent).toBe('Heading')
  })

  it('renders p element with text Paragraph', () => {
    expect(container.body.querySelector('p')).not.toBeNull()
    expect(container.body.querySelector('p').textContent).toBe('Paragraph')
  })

})
