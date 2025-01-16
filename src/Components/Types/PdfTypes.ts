export interface SimpleElement {
    name: string;
    type: string;
    seq: string;
    txt: string;
    x: string;
    ln_x: string;
    y: string;
    ln_y: string;
    w: string;
    h: string;
    h_adjustable: string;
    padding_top: string;
    padding_right: string;
    padding_bottom: string;
    padding_left: string;
    margin_top: string;
    margin_left: string;
    align: string;
    valign: string;
    font_size: string;
    font_family: string;
    fontcolor: string;
    border_top: string;
    border_right: string;
    border_bottom: string;
    border_left: string;
}

export interface Format {
    w: string;
    h: string;
    padding_top: string;
    padding_left: string;
    padding_right: string;
    padding_bottom: string;
    elements: SimpleElement[];
}

export interface PdfFormat {
    name: string;
    type: string;
    rotation: string;
    is_multiple: string;
    cols: string;
    rows: string;
    cell_w: string;
    cell_h: string;
    space_horizontal: string;
    space_vertical: string;
    formats: Format[];
}