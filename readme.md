![](https://javascript30.com/images/JS3-social-share.png)

# JavaScript30

My take on the challenge + extra features added to each app

Each folder contains:

- My solution with added functionality (_filename_.html)
- Original solution (_filename_-ORIGINAL.html)
- Starter file (_filename_-START.html)

Grab the course at [https://JavaScript30.com](https://JavaScript30.com)

## List of modifications

#### 01 - JS Drum Kit [(view)](https://sebsterio.github.io/JavaScript30/01%20-%20JavaScript%20Drum%20Kit/index.html)

- Drums respond to click events
- Responsive; mobile first

#### 02 - JS and CSS Clock [(view)](https://sebsterio.github.io/JavaScript30/02%20-%20JS%20and%20CSS%20Clock/index.html)

- Clock hands have various length

#### 03 - CSS Variables [(view)](https://sebsterio.github.io/JavaScript30/02%20-%20JS%20and%20CSS%20Clock/index.html)

- Initial values of input elements sync up with CSS vars
- Inputs update values only when mouse button is pressed
- `rotate` variable instead of `padding`
- Responsive; mobile first
- Touch screen support

#### 05 - Flex Panel Gallery [(view)](https://sebsterio.github.io/JavaScript30/05%20-%20Flex%20Panel%20Gallery/index.html)

- Panels expand on 'mouseover' instead of 'click'
- Opening a panel closes the previous one.
- more dynamic CSS transitions.

#### 06 - Type Ahead [(view)](https://sebsterio.github.io/JavaScript30/06%20-%20Type%20Ahead/index.html)

- Results are sorted by a selected property

#### 07 - Array Cardio 2

- find() and findIndex() are abstracted

#### 08 - Canvas [(view)](https://sebsterio.github.io/JavaScript30/08%20-%20Fun%20with%20HTML5%20Canvas/index.html)

- Actions can be undone
- Touch screen support
- Canvas preseves content on resize

#### 10 - Checkboxes [(view)](https://sebsterio.github.io/JavaScript30/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/index.html)

- Clicking two boxes while holding Shift checks OR UNCHECKS all boxes in between, to match the state of the first box clicked
- The same operation is performed on subsequent clicks as long as shift is held (matching the very first box)

#### 12 - keyLog [(view)](https://sebsterio.github.io/JavaScript30/12%20-%20Key%20Sequence%20Detection/index.html)

- Arbitrary number of availble keywords
- If the key sequence matches multiple keywords, the recently matched one takes precedence (e.g. gold < goldenrod)
- Longer keywords have higher precedence (red < darkred)

#### 13 - Slide in on Scroll [(view)](https://sebsterio.github.io/JavaScript30/13%20-%20Slide%20in%20on%20Scroll/index.html)

- Bugfix: On each scroll, images react to the window's final position, rather than initial
- Images start sliding as soon as they appear on screen - not when they're halfway in
- Custom debounce function (for the sake of practice)

#### 16 - Mouse Move shadow [(view)](https://sebsterio.github.io/JavaScript30/16%20-%20Mouse%20Move%20Shadow/index.html)

- Interactive text-shadow size and blur
- Variable parameters set in UI
- Touch screen support
- Responsive font size

#### 18 - Adding Up Times with reduce [(view)]()

- Functional programming approach & reusable functions

## TODO

#### Clock

- Prevent clock hands from moving from 360deg back to 0deg at the end of a cycle

#### Sort without articles

- make it interactive -> add to portfolio
