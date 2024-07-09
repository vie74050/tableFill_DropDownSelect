# About

The scripts create `<Select>` components to replace table column `<td>` content, i.e. the answer column(s). Select `<options>` will be from all the answers (duplicates will be combined so only unique choices).

## Legacy script

`scripts/ddm_v1/dropdownMatching` is an older version and processes only 2-columns; `ddm_v2` is the updated version for multi-column support.

> Creates drop down using Select component to match Column2 content to Column1 content.
> Updated from _SOH CARD 4201 activity (archived from test.ltc.bcit).  
> Modified to create the data from table in the body.
>
> **HTML**: 2 columns table.  
>
>- First column are the questions
>- Second column are the answers, the content of which will be the options for Select component.  

The v1 version is archived for reference for support.  If Learning Hub pages are using older refences, it should be updated if possible to the latest.

## ddm_v2

`https://learn.bcit.ca/shared/scripts/interactive/tableFill_DropDownSelect/scripts//ddm_v2`  
This is an updated Drop down creator that allows for multi-column tables.  

### v2 HTML

An HTML table with headers `<th>`.

e.g.

```html
<table class="left">
      <thead>
        <tr>
          <th class="_ddm" width="20%">Drug</th>
          <th>Indications</th>
          <th >Action</th>
          <th class="_ddm" width="20%">Key Points of Administration &amp; Mode of Administration</th>
          <th>Considerations</th>
          <th>Adverse effects/ Side effects</th>     
        </tr>
```

### Classes

- table `_randomize`
- th `_ddm`

Add `_randomize` classs to `<table>` to randomize rows in user-view.

Add `_ddm` class to the `<th>`for the columns to replace with `<select>` dropdowns.  
Static columns keep original content. Corresponding columns `<td>` content will be replaced with `<select>` components with aggregated unique options based on the texts in the column.

If no `th` marked with class `_ddm`, then the last column will be converted.

### Styles

`ddm_v2.css` contains minimal styles for functionality so it can inherit other global styles (`bcit.css`, `boostrap` ..etc), for consistency with other components.

#### optional styles

- Table `class="left"`: to text align content left (over ride `bcit.css` table formatting).

## Deployed source files

### Package

#### pack-libs

`pack-libs` - Combines external minified resources from the `./scripts/libs/` to `./dist/`.
These are the `jquery` and `bootstrap` files and should be loaded first in `<head>`.  

There should be no need to repackage these unless there are critical updates in `bootstrap` and `jquery` support.

**Note** that `bootstrap-select` version require specific `bootstrap` and `jquery` versions.  Do not update unless all are compatible.
See <https://developer.snapappointments.com/bootstrap-select/> documentation.

#### dist

Use `npm run pack-ddm` which minfies ddm sources and combines minified files to `./dist`.  Can do just `pack-ddm` if libs have not changed.
Can run `npm run dist` to run both steps.

## Learning Hub standard practice

Copy the `./dist` content to BCIT Learning Hub shared folder: `https://learn.bcit.ca/shared/scripts/interactive/tableFill_DropDownSelect/` (requires login with permissions)

Sample published to LOR as "DD_tableFillSample": <https://learn.bcit.ca/d2l/lor/manageLO/overview.d2l?ou=6605&loId=55220> (requires login with permissions)

HTML component page normally placed in `interactive/DD_tableFill/` folder and then iframe embedded into the course content page.

### Embed code for CP

```html

<figure class="largest"><iframe id="iframe-birth" src="../../interactive/DD_tableFill/{{filename}}.html?ou=383363" width="100%" height="510" scrolling="no" marginwidth="0" frameborder="0" onwheel="{(e)={console.log('Scrolling Me..'); e.stopPropagation();}}"></iframe></figure>

```
