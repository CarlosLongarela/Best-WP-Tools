# Instructions for developers in development process

## NPM
* For development and gulp task we must be in root folder and execute `$ npm install`
* For update npm packages globally use `$ npm update -g`
* Folder ___node_modules___ isn't tracked in Git and we must update npm modules (previous step)
* We'll execute `$ npm audit` for view vulnerabilities problems and
* `$ npm audit fix` for fix them
* For execute gulp tasks we'll run in terminal `$ gulp`
* If the previous command do not work, we can execute with the full path `./node_modules/.bin/gulp`

## Tooltips
```
<div class="tooltip">Hover over me
<span class="tooltiptext">This is a tooltip for short texts</span>
</div>
```
