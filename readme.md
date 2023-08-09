# About

The scripts create `<Select>` components to replace table column `<td>` content, i.e. the answer column(s). Select `<options>` will be from all the answers (duplicates will be combined so only unique choices).

## Legacy script

`scripts/dropdownMatching` is an older version and processes only 2-columns; `ddm_v2` is the updated version for multi-column support.

> Creates drop down using Select component to match Column2 content to Column1 content.
> Updated from _SOH CARD 4201 activity (archived from test.ltc.bcit).  
> Modified to create the data from table in the body.
>
> **HTML**: 2 columns table.  
>
>- First column are the questions
>- Second column are the answers, the content of which will be the options for Select component.  

## ddm_v2

`../scripts/ddm_v2`  
This is an updated Drop down creator that allows for multi-column tables.  

### v2 HTML

An HTML table with headers `<th>`.

Identify the columns to replace by adding `_ddm` class to the `<th>`. Static columns keep original content. Corresponding columns `<td>` content will be replaced with `<select>` components with aggregated unique options based on the texts in the column.

If no `th` marked with class `_ddm`, then the last column will be converted.

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

### Styles

`ddm_v2.css` contains minimal styles for functionality so it can inherit other global styles (`bcit.css`, `boostrap` ..etc), for consistency with other components.

#### optional styles

- Table `class="left"`: to text align content left (over ride `bcit.css` table formatting).

## Deployed source files

`scripts` published to BCIT Learning Hub shared folder: `https://learn.bcit.ca/shared/scripts/interactive/tableFill_DropDownSelect/`.

Sample published to LOR as "DD_tableFillSample": <https://learn.bcit.ca/d2l/lor/manageLO/overview.d2l?ou=6605&loId=55220>  
