//@ sourceURL=getPagesSource.js
// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    var regex = /\$[0-9]{1,10}k/g;
    //debugger;
    var html = '',
        node = document_root.firstChild;
    console.log("Running...");
    while (node) {
        s = ''
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            s = node.outerHTML;
            if (i=s.match(regex))
            {
              html += "1|"+s;
              console.log("matched:"+s);
            }
            break;
        case Node.TEXT_NODE:
            s = node.nodeValue;
            if (s.match(regex))
            {
              html += "2|"+s;
              console.log("matched:"+s);
            }
            break;
        case Node.CDATA_SECTION_NODE:
            s = '<![CDATA[' + node.nodeValue + ']]>';
            if (s.match(regex))
            {
              html += "3|"+s;
              console.log("matched:"+s);
            }
            break;
        case Node.COMMENT_NODE:
            s = '<!--' + node.nodeValue + '-->';
            if (s.match(regex))
            {
              html += "4|"+s;
              console.log("matched:"+s);
            }
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            s = "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            if (s.match(regex))
            {
              html += "5|"+s;
              console.log("matched:"+s);
            }
            break;
        }
        node = node.nextSibling;
	if (s == '') 
          alert("Not found");
    }
    return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});

