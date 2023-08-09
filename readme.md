# About

The scripts create `Select` components to replace table column content.  
`dropdownMatching` is an older version and processes only 2-columns; `ddm_Columns` is the updated version for multi-column support. 

## dropdownMatching - legacy -

`scripts/dropdownMatching`  
Creates drop down using Select component to match Column2 content to Column1 content.
Updated from _SOH CARD 4201 activity (archived from test.ltc.bcit).  Modified to create the data from table in the body.

**HTML content requirements**: 2 columns table.  

- First column are the questions
- Second column are the answers, the content of which will be the options for Select component. 
Selection component options will be from all the answers (duplicates will be combined so only unique choices)

## ddm_Columns

`scripts/ddm_Columns`  
This is an updated Drop down creator that allows for multi-column tables.  

### HTML

Identify the columns to keep change by adding `_ddm` class to the `th`. Static columns keep original content. Corresponding columns `td` content will be replaced with `select` components with aggregated unique options based on the texts in the column.

If no `th` marked with class `_ddm`, then the last column will be converted.

**HTML content requirements**: a table with >1 columns, e.g.

```html
<table class="compact striped left">
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

### styles

`ddm_Columns.css` contains minimal styles for functionality so it can inherit other global styles (`bcit.css`, `boostrap` ..etc), for consistency with other components.

#### optional styles

- `table class="left"` to text align content left (over ride `bcit.css` table formatting).

## Deployed source files

Scripts published to BCIT Learning Hub shared folder: `https://learn.bcit.ca/shared/scripts/interactive/tableFill_DropDownSelect/`.
