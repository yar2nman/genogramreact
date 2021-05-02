/* eslint-disable no-loop-func */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as go from 'gojs';
import * as React from 'react';
import { ReactDiagram } from 'gojs-react';
import './testchartjen.css'
import { GenogramLayout } from './genogramLayout';


  interface TestChartJenoState {
    // ...
    nodeDataArray: Array<go.ObjectData>;
    // linkDataArray: Array<go.ObjectData>;
    modelData: go.ObjectData;
    selectedKey: number | null;
    skipsDiagramUpdate: boolean;
  }

 export class TestChartJeno extends React.Component<{}, TestChartJenoState> {

  

    constructor(props: object) {
      super(props);
      this.state = {
        // ...
        nodeDataArray: [
          { key: 0, n: "Aaron", s: "M", m:-10, f:-11, ux: 1, a: ["C", "F", "K"] },
          { key: 1, n: "Alice", s: "F", m:-12, f:-13, a: ["B", "H", "K"] },
          { key: 2, n: "Bob", s: "M", m: 1, f: 0, ux: 3, a: ["C", "H", "L"] },
          { key: 3, n: "Barbara", s: "F", a: ["C"] },
          { key: 4, n: "Bill", s: "M", m: 1, f: 0, ux: 5, a: ["E", "H"] },
          { key: 5, n: "Brooke", s: "F", a: ["B", "H", "L"] },
          { key: 6, n: "Claire", s: "F", m: 1, f: 0, a: ["C"] },
          { key: 7, n: "Carol", s: "F", m: 1, f: 0, a: ["C", "I"] },
          { key: 8, n: "Chloe", s: "F", m: 1, f: 0, vir: 9, a: ["E"] },
          { key: 9, n: "Chris", s: "M", a: ["B", "H"] },
          { key: 10, n: "Ellie", s: "F", m: 3, f: 2, a: ["E", "G"] },
          { key: 11, n: "Dan", s: "M", m: 3, f: 2, a: ["B", "J"] },
          { key: 12, n: "Elizabeth", s: "F", vir: 13, a: ["J"] },
          { key: 13, n: "David", s: "M", m: 5, f: 4, a: ["B", "H"] },
          { key: 14, n: "Emma", s: "F", m: 5, f: 4, a: ["E", "G"] },
          { key: 15, n: "Evan", s: "M", m: 8, f: 9, a: ["F", "H"] },
          { key: 16, n: "Ethan", s: "M", m: 8, f: 9, a: ["D", "K", "S"] },
          { key: 17, n: "Eve", s: "F", vir: 16, a: ["B", "F", "L", "S"] },
          { key: 18, n: "Emily", s: "F", m: 8, f: 9 },
          { key: 19, n: "Fred", s: "M", m: 17, f: 16, a: ["B"] },
          { key: 20, n: "Faith", s: "F", m: 17, f: 16, a: ["L"] },
          { key: 21, n: "Felicia", s: "F", m: 12, f: 13, a: ["H"] },
          { key: 22, n: "Frank", s: "M", m: 12, f: 13, a: ["B", "H"] },
    
          // "Aaron"'s ancestors
          { key: -10, n: "Paternal Grandfather", s: "M", m: -33, f: -32, ux: -11, a: ["A"] },
          { key: -11, n: "Paternal Grandmother", s: "F", a: ["E"] },
          { key: -32, n: "Paternal Great", s: "M", ux: -33, a: ["F", "H"] },
          { key: -33, n: "Paternal Great", s: "F" },
          { key: -40, n: "Great Uncle", s: "M", m: -33, f: -32, a: ["F", "H"] },
          { key: -41, n: "Great Aunt", s: "F", m: -33, f: -32, a: ["B", "I"] },
          { key: -20, n: "Uncle", s: "M", m: -11, f: -10, a: ["A"] },
    
          // "Alice"'s ancestors
          { key: -12, n: "Maternal Grandfather", s: "M", ux: -13, a: ["D", "L"] },
          { key: -13, n: "Maternal Grandmother", s: "F", m: -31, f: -30, a: ["H"] },
          { key: -21, n: "Aunt", s: "F", m: -13, f: -12, a: ["C", "I"] },
          { key: -22, n: "uncle", s: "M", ux: -21 },
          { key: -23, n: "cousin", s: "M", m: -21, f: -22 },
          { key: -30, n: "Maternal Great", s: "M", ux: -31, a: ["D", "J"] },
          { key: -31, n: "Maternal Great", s: "F", m: -50, f: -51, a: ["B", "H", "L"] },
          { key: -42, n: "Great Uncle", s: "M", m: -30, f: -31, a: ["C", "J"] },
          { key: -43, n: "Great Aunt", s: "F", m: -30, f: -31, a: ["E", "G"] },
          { key: -50, n: "Maternal Great Great", s: "F", ux: -51, a: ["D", "I"] },
          { key: -51, n: "Maternal Great Great", s: "M", a: ["B", "H"] }
        ],
        modelData: {
          canRelink: true
        },
        selectedKey: null,
        skipsDiagramUpdate: false
      };
      // bind handler methods
      this.handleDiagramEvent = this.handleDiagramEvent.bind(this);
      this.handleModelChange = this.handleModelChange.bind(this);
      this.handleRelinkChange = this.handleRelinkChange.bind(this);
    }

    /**
     * Handle any app-specific DiagramEvents, in this case just selection changes.
     * On ChangedSelection, find the corresponding data and set the selectedKey state.
     *
     * This is not required, and is only needed when handling DiagramEvents from the GoJS diagram.
     * @param e a GoJS DiagramEvent
     */
    public handleDiagramEvent(e: go.DiagramEvent) {
      const name = e.name;
      switch (name) {
        case 'ChangedSelection': {
          const sel = e.subject.first();
          if (sel) {
            this.setState({ selectedKey: sel.key });
          } else {
            this.setState({ selectedKey: null });
          }
          break;
        }
        default: break;
      }
    }

    /**
     * Handle GoJS model changes, which output an object of data changes via Model.toIncrementalData.
     * This method should iterates over those changes and update state to keep in sync with the GoJS model.
     * This can be done via setState in React or another preferred state management method.
     * @param obj a JSON-formatted string
     */
    public handleModelChange(obj: go.IncrementalData) {
      const insertedNodeKeys = obj.insertedNodeKeys;
      const modifiedNodeData = obj.modifiedNodeData;
      const removedNodeKeys = obj.removedNodeKeys;
      const insertedLinkKeys = obj.insertedLinkKeys;
      const modifiedLinkData = obj.modifiedLinkData;
      const removedLinkKeys = obj.removedLinkKeys;
      const modifiedModelData = obj.modelData;

      console.log(obj);

      // see gojs-react-basic for an example model change handler
      // when setting state, be sure to set skipsDiagramUpdate: true since GoJS already has this update
    }

    /**
     * Handle changes to the checkbox on whether to allow relinking.
     * @param e a change event from the checkbox
     */
    public handleRelinkChange(e: any) {
      const target = e.target;
      const value = target.checked;
      this.setState({ modelData: { canRelink: value }, skipsDiagramUpdate: false });
    }

    public render() {
      let selKey;
      if (this.state.selectedKey !== null) {
        selKey = <p>Selected key: {this.state.selectedKey}</p>;
      }

      return (
        <div>
          <DiagramWrapper
            nodeDataArray={this.state.nodeDataArray}
            // linkDataArray={this.state.linkDataArray}
            modelData={this.state.modelData}
            skipsDiagramUpdate={this.state.skipsDiagramUpdate}
            onDiagramEvent={this.handleDiagramEvent}
            onModelChange={this.handleModelChange}
          />
          <label>
            Allow Relinking?
            <input
              type='checkbox'
              id='relink'
              checked={this.state.modelData.canRelink}
              onChange={this.handleRelinkChange} />
          </label>
          {selKey}
        </div>
      );
    }
  }






  // props passed in from a parent component holding state, some of which will be passed to ReactDiagram
  interface WrapperProps {
    nodeDataArray: Array<go.ObjectData>;
    // linkDataArray: Array<go.ObjectData>;
    modelData: go.ObjectData;
    skipsDiagramUpdate: boolean;
    onDiagramEvent: (e: go.DiagramEvent) => void;
    onModelChange: (e: go.IncrementalData) => void;
  }

  export class DiagramWrapper extends React.Component<WrapperProps, {}> {
    /**
     * Ref to keep a reference to the component, which provides access to the GoJS diagram via getDiagram().
     */
    private diagramRef: React.RefObject<ReactDiagram>;
    public direction: number | undefined;
    network: any;
    spouseSpacing: number = 0;
    initializeOption: go.EnumValue | undefined;

    constructor(props: WrapperProps) {
      super(props);
      this.diagramRef = React.createRef();
    }

   

    /**
     * Get the diagram reference and add any desired diagram listeners.
     * Typically the same function will be used for each listener,
     * with the function using a switch statement to handle the events.
     * This is only necessary when you want to define additional app-specific diagram listeners.
     */
    public componentDidMount() {
      if (!this.diagramRef.current) return;
      var diagram = this.diagramRef.current.getDiagram();
      if (diagram instanceof go.Diagram) {
        diagram.addDiagramListener('ChangedSelection', this.props.onDiagramEvent);
      }

      const $ = go.GraphObject.make;
      // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
     
      

      
      

       // n: name, s: sex, m: mother, f: father, ux: wife, vir: husband, a: attributes/markers
       this.setupDiagram(diagram, [
      ],
        4 );


        diagram =
        $(go.Diagram,
          {initialAutoScale: go.Diagram.Uniform,
            'undoManager.isEnabled': true,
            // when a node is selected, draw a big yellow circle behind it
            nodeSelectionAdornmentTemplate:
              $(go.Adornment, 'Auto',
                { layerName: 'Grid' },  // the predefined layer that is behind everything else
                $(go.Shape, 'Circle', { fill: 'yellow', stroke: null }),
                $(go.Placeholder)
              ),
            layout:  // use a custom layout, defined below
              $(GenogramLayout, { direction: 90, layerSpacing: 30, columnSpacing: 10 })
          });

     // determine the color for each attribute shape
     function attrFill(a: any) {
      switch (a) {
        case "A": return "#00af54"; // green
        case "B": return "#f27935"; // orange
        case "C": return "#d4071c"; // red
        case "D": return "#70bdc2"; // cyan
        case "E": return "#fcf384"; // gold
        case "F": return "#e69aaf"; // pink
        case "G": return "#08488f"; // blue
        case "H": return "#866310"; // brown
        case "I": return "#9270c2"; // purple
        case "J": return "#a3cf62"; // chartreuse
        case "K": return "#91a4c2"; // lightgray bluish
        case "L": return "#af70c2"; // magenta
        case "S": return "#d4071c"; // red
        default: return "transparent";
      }
    }

    // determine the geometry for each attribute shape in a male;
    // except for the slash these are all squares at each of the four corners of the overall square
    var tlsq = go.Geometry.parse("F M1 1 l19 0 0 19 -19 0z");
    var trsq = go.Geometry.parse("F M20 1 l19 0 0 19 -19 0z");
    var brsq = go.Geometry.parse("F M20 20 l19 0 0 19 -19 0z");
    var blsq = go.Geometry.parse("F M1 20 l19 0 0 19 -19 0z");
    var slash = go.Geometry.parse("F M38 0 L40 0 40 2 2 40 0 40 0 38z");

    function maleGeometry(a: any) {
      switch (a) {
        case "A": return tlsq;
        case "B": return tlsq;
        case "C": return tlsq;
        case "D": return trsq;
        case "E": return trsq;
        case "F": return trsq;
        case "G": return brsq;
        case "H": return brsq;
        case "I": return brsq;
        case "J": return blsq;
        case "K": return blsq;
        case "L": return blsq;
        case "S": return slash;
        default: return tlsq;
      }
    }

     // determine the geometry for each attribute shape in a female;
      // except for the slash these are all pie shapes at each of the four quadrants of the overall circle
      var tlarc = go.Geometry.parse("F M20 20 B 180 90 20 20 19 19 z");
      var trarc = go.Geometry.parse("F M20 20 B 270 90 20 20 19 19 z");
      var brarc = go.Geometry.parse("F M20 20 B 0 90 20 20 19 19 z");
      var blarc = go.Geometry.parse("F M20 20 B 90 90 20 20 19 19 z");
      function femaleGeometry(a: any) {
        switch (a) {
          case "A": return tlarc;
          case "B": return tlarc;
          case "C": return tlarc;
          case "D": return trarc;
          case "E": return trarc;
          case "F": return trarc;
          case "G": return brarc;
          case "H": return brarc;
          case "I": return brarc;
          case "J": return blarc;
          case "K": return blarc;
          case "L": return blarc;
          case "S": return slash;
          default: return tlarc;
        }
      }

      // two different node templates, one for each sex,
      // named by the category value in the node data object
      diagram.nodeTemplateMap.add('M',  // male
    $(go.Node, 'Vertical',
      { locationSpot: go.Spot.Center, locationObjectName: 'ICON' },
      $(go.Panel,
        { name: 'ICON' },
        $(go.Shape, 'Square',
          { width: 40, height: 40, strokeWidth: 2, fill: 'white', portId: '' }),
        $(go.Panel,
          { // for each attribute show a Shape at a particular place in the overall square
            itemTemplate:
              $(go.Panel,
                $(go.Shape,
                  { stroke: null, strokeWidth: 0 },
                  new go.Binding('fill', '', attrFill),
                  new go.Binding('geometry', '', maleGeometry))
              ),
            margin: 1
          },
          new go.Binding('itemArray', 'a')
        )
      ),
      $(go.TextBlock,
        { textAlign: 'center', maxSize: new go.Size(80, NaN) },
        new go.Binding('text', 'n'))
    ));


    diagram.nodeTemplateMap.add('F',  // female
    $(go.Node, 'Vertical',
      { locationSpot: go.Spot.Center, locationObjectName: 'ICON' },
      $(go.Panel,
        { name: 'ICON' },
        $(go.Shape, 'Circle',
          { width: 40, height: 40, strokeWidth: 2, fill: 'white', portId: '' }),
        $(go.Panel,
          { // for each attribute show a Shape at a particular place in the overall circle
            itemTemplate:
              $(go.Panel,
                $(go.Shape,
                  { stroke: null, strokeWidth: 0 },
                  new go.Binding('fill', '', attrFill),
                  new go.Binding('geometry', '', femaleGeometry))
              ),
            margin: 1
          },
          new go.Binding('itemArray', 'a')
        )
      ),
      $(go.TextBlock,
        { textAlign: 'center', maxSize: new go.Size(80, NaN) },
        new go.Binding('text', 'n'))
    ));

    // the representation of each label node -- nothing shows on a Marriage Link
      diagram.nodeTemplateMap.add('LinkLabel',
      $(go.Node, { selectable: false, width: 1, height: 1, fromEndSegmentLength: 20 }));


      diagram.linkTemplate =  // for parent-child relationships
      $(go.Link,
        {
          routing: go.Link.Orthogonal, curviness: 15,
          layerName: 'Background', selectable: false,
          fromSpot: go.Spot.Bottom, toSpot: go.Spot.Top
        },
        $(go.Shape, { strokeWidth: 2 })
      );
  
    diagram.linkTemplateMap.add('Marriage',  // for marriage relationships
      $(go.Link,
        { selectable: false },
        $(go.Shape, { strokeWidth: 2, stroke: 'blue' })
      ));

    
    }

    /**
     * Get the diagram reference and remove listeners that were added during mounting.
     * This is only necessary when you have defined additional app-specific diagram listeners.
     */
    public componentWillUnmount() {
      if (!this.diagramRef.current) return;
      const diagram = this.diagramRef.current.getDiagram();
      if (diagram instanceof go.Diagram) {
        diagram.removeDiagramListener('ChangedSelection', this.props.onDiagramEvent);
      }
    }

    /**
     * Diagram initialization method, which is passed to the ReactDiagram component.
     * This method is responsible for making the diagram and initializing the model, any templates,
     * and maybe doing other initialization tasks like customizing tools.
     * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
     */
    private initDiagram(): go.Diagram {
      const $ = go.GraphObject.make;
      // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
      const diagram =
        $(go.Diagram,
          {initialAutoScale: go.Diagram.Uniform,
            'undoManager.isEnabled': true,
            // when a node is selected, draw a big yellow circle behind it
            nodeSelectionAdornmentTemplate:
              $(go.Adornment, 'Auto',
                { layerName: 'Grid' },  // the predefined layer that is behind everything else
                $(go.Shape, 'Circle', { fill: 'yellow', stroke: null }),
                $(go.Placeholder)
              ),
            layout:  // use a custom layout, defined below
              $(GenogramLayout, { direction: 90, layerSpacing: 30, columnSpacing: 10 })
          });

     // determine the color for each attribute shape
     function attrFill(a: any) {
      switch (a) {
        case "A": return "#00af54"; // green
        case "B": return "#f27935"; // orange
        case "C": return "#d4071c"; // red
        case "D": return "#70bdc2"; // cyan
        case "E": return "#fcf384"; // gold
        case "F": return "#e69aaf"; // pink
        case "G": return "#08488f"; // blue
        case "H": return "#866310"; // brown
        case "I": return "#9270c2"; // purple
        case "J": return "#a3cf62"; // chartreuse
        case "K": return "#91a4c2"; // lightgray bluish
        case "L": return "#af70c2"; // magenta
        case "S": return "#d4071c"; // red
        default: return "transparent";
      }
    }

    // determine the geometry for each attribute shape in a male;
    // except for the slash these are all squares at each of the four corners of the overall square
    var tlsq = go.Geometry.parse("F M1 1 l19 0 0 19 -19 0z");
    var trsq = go.Geometry.parse("F M20 1 l19 0 0 19 -19 0z");
    var brsq = go.Geometry.parse("F M20 20 l19 0 0 19 -19 0z");
    var blsq = go.Geometry.parse("F M1 20 l19 0 0 19 -19 0z");
    var slash = go.Geometry.parse("F M38 0 L40 0 40 2 2 40 0 40 0 38z");

    function maleGeometry(a: any) {
      switch (a) {
        case "A": return tlsq;
        case "B": return tlsq;
        case "C": return tlsq;
        case "D": return trsq;
        case "E": return trsq;
        case "F": return trsq;
        case "G": return brsq;
        case "H": return brsq;
        case "I": return brsq;
        case "J": return blsq;
        case "K": return blsq;
        case "L": return blsq;
        case "S": return slash;
        default: return tlsq;
      }
    }

     // determine the geometry for each attribute shape in a female;
      // except for the slash these are all pie shapes at each of the four quadrants of the overall circle
      var tlarc = go.Geometry.parse("F M20 20 B 180 90 20 20 19 19 z");
      var trarc = go.Geometry.parse("F M20 20 B 270 90 20 20 19 19 z");
      var brarc = go.Geometry.parse("F M20 20 B 0 90 20 20 19 19 z");
      var blarc = go.Geometry.parse("F M20 20 B 90 90 20 20 19 19 z");
      function femaleGeometry(a: any) {
        switch (a) {
          case "A": return tlarc;
          case "B": return tlarc;
          case "C": return tlarc;
          case "D": return trarc;
          case "E": return trarc;
          case "F": return trarc;
          case "G": return brarc;
          case "H": return brarc;
          case "I": return brarc;
          case "J": return blarc;
          case "K": return blarc;
          case "L": return blarc;
          case "S": return slash;
          default: return tlarc;
        }
      }

      // two different node templates, one for each sex,
      // named by the category value in the node data object
      diagram.nodeTemplateMap.add('M',  // male
    $(go.Node, 'Vertical',
      { locationSpot: go.Spot.Center, locationObjectName: 'ICON' },
      $(go.Panel,
        { name: 'ICON' },
        $(go.Shape, 'Square',
          { width: 40, height: 40, strokeWidth: 2, fill: 'white', portId: '' }),
        $(go.Panel,
          { // for each attribute show a Shape at a particular place in the overall square
            itemTemplate:
              $(go.Panel,
                $(go.Shape,
                  { stroke: null, strokeWidth: 0 },
                  new go.Binding('fill', '', attrFill),
                  new go.Binding('geometry', '', maleGeometry))
              ),
            margin: 1
          },
          new go.Binding('itemArray', 'a')
        )
      ),
      $(go.TextBlock,
        { textAlign: 'center', maxSize: new go.Size(80, NaN) },
        new go.Binding('text', 'n'))
    ));


    diagram.nodeTemplateMap.add('F',  // female
    $(go.Node, 'Vertical',
      { locationSpot: go.Spot.Center, locationObjectName: 'ICON' },
      $(go.Panel,
        { name: 'ICON' },
        $(go.Shape, 'Circle',
          { width: 40, height: 40, strokeWidth: 2, fill: 'white', portId: '' }),
        $(go.Panel,
          { // for each attribute show a Shape at a particular place in the overall circle
            itemTemplate:
              $(go.Panel,
                $(go.Shape,
                  { stroke: null, strokeWidth: 0 },
                  new go.Binding('fill', '', attrFill),
                  new go.Binding('geometry', '', femaleGeometry))
              ),
            margin: 1
          },
          new go.Binding('itemArray', 'a')
        )
      ),
      $(go.TextBlock,
        { textAlign: 'center', maxSize: new go.Size(80, NaN) },
        new go.Binding('text', 'n'))
    ));

    // the representation of each label node -- nothing shows on a Marriage Link
      diagram.nodeTemplateMap.add('LinkLabel',
      $(go.Node, { selectable: false, width: 1, height: 1, fromEndSegmentLength: 20 }));


      diagram.linkTemplate =  // for parent-child relationships
      $(go.Link,
        {
          routing: go.Link.Orthogonal, curviness: 15,
          layerName: 'Background', selectable: false,
          fromSpot: go.Spot.Bottom, toSpot: go.Spot.Top
        },
        $(go.Shape, { strokeWidth: 2 })
      );
  
    diagram.linkTemplateMap.add('Marriage',  // for marriage relationships
      $(go.Link,
        { selectable: false },
        $(go.Shape, { strokeWidth: 2, stroke: 'blue' })
      ));
      


   


      return diagram;
    }




    // create and initialize the Diagram.model given an array of node data representing people
    // n: name, s: sex, m: mother, f: father, ux: wife, vir: husband, a: attributes/markers
    setupDiagram = (diagram: any, array: any, focusId: any) => {
      diagram.model =
        go.GraphObject.make(go.GraphLinksModel,
          { // declare support for link label nodes
            linkLabelKeysProperty: 'labelKeys',
            // this property determines which template is used
            nodeCategoryProperty: "s",
            // if a node data object is copied, copy its data.a Array
            copiesArrays: true,
            // create all of the nodes for people
            // nodeDataArray: array
          });
      this.setupMarriages(diagram);
      this.setupParents(diagram);

      var node = diagram.findNodeForKey(focusId);
      if (node !== null) {
        diagram.select(node);
        // remove any spouse for the person under focus:
        //node.linksConnected.each(function(l) {
        //  if (!l.isLabeledLink) return;
        //  l.opacity = 0;
        //  var spouse = l.getOtherNode(node);
        //  spouse.opacity = 0;
        //  spouse.pickable = false;
        //});
      }

      return;
    }

 


// revised
    public  findMarriage(diagram: go.Diagram, a: number, b: number) {  // A and B are node keys
      const nodeA = diagram.findNodeForKey(a);
      const nodeB = diagram.findNodeForKey(b);
      if (nodeA !== null && nodeB !== null) {
        const it = nodeA.findLinksBetween(nodeB);  // in either direction
        while (it.next()) {
          const link = it.value;
          // Link.data.category === "Marriage" means it's a marriage relationship
          if (link.data !== null && link.data.category === 'Marriage') return link;
        }
      }
      return null;
    }

// now process the node data to determine marriages
// Revised
public setupMarriages(diagram: go.Diagram) {
  const model = diagram.model as go.GraphLinksModel;
  const nodeDataArray = model.nodeDataArray;
  for (let i = 0; i < nodeDataArray.length; i++) {
    const data = nodeDataArray[i];
    const key = data.key;
    if (data.ux !== undefined) {
      let uxs: Array<number> = [];
      if (typeof data.ux === 'number') uxs = [data.ux] as Array<number>;
      for (let j = 0; j < uxs.length; j++) {
        const wife = uxs[j];
        if (key === wife) {
          // or warn no reflexive marriages
          continue;
        }
        const link = this.findMarriage(diagram, key, wife);
        if (link === null) {
          // add a label node for the marriage link
          const mlab = { s: 'LinkLabel' };
          model.addNodeData(mlab);
          // add the marriage link itself, also referring to the label node
          const mdata = { from: key, to: wife, labelKeys: [mlab.s], category: 'Marriage' };
          model.addLinkData(mdata);
        }
      }
    }
    if (data.vir !== undefined) {
      const virs: Array<number> = (typeof data.vir === 'number') ? [data.vir] : data.vir as Array<number>;
      for (let j = 0; j < virs.length; j++) {
        const husband = virs[j];
        if (key === husband) {
          // or warn no reflexive marriages
          continue;
        }
        const link = this.findMarriage(diagram, key, husband);
        if (link === null) {
          // add a label node for the marriage link
          const mlab = { s: 'LinkLabel' };
          model.addNodeData(mlab);
          // add the marriage link itself, also referring to the label node
          const mdata = { from: key, to: husband, labelKeys: [mlab.s], category: 'Marriage' };
          model.addLinkData(mdata);
        }
      }
    }
  }
}

 // process parent-child relationships once all marriages are known
 // Revised
 public setupParents(diagram: go.Diagram) {
  const model = diagram.model as go.GraphLinksModel;
  const nodeDataArray = model.nodeDataArray;
  for (let i = 0; i < nodeDataArray.length; i++) {
    const data = nodeDataArray[i];
    const key = data.key;
    const mother = data.m;
    const father = data.f;
    if (mother !== undefined && father !== undefined) {
      const link = this.findMarriage(diagram, mother, father);
      if (link === null) {
        // or warn no known mother or no known father or no known marriage between them
        if (window.console) window.console.log('unknown marriage: ' + mother + ' & ' + father);
        continue;
      }
      const mdata = link.data;
      const mlabkey = mdata.labelKeys[0];
      const cdata = { from: mlabkey, to: key };
      model.addLinkData(cdata);
    }
  }
}

   

 
    // internal method for creating LayeredDigraphNetwork where husband/wife pairs are represented
    // by a single LayeredDigraphVertex corresponding to the label Node on the marriage Link
    public add = (net: any, coll: any, nonmemberonly: any) => {
      var multiSpousePeople = new go.Set();
      // consider all Nodes in the given collection
      var it = coll.iterator;
      while (it.next()) {
        var node = it.value;
        if (!(node instanceof go.Node)) continue;
        if (!node.isLayoutPositioned || !node.isVisible()) continue;
        if (nonmemberonly && node.containingGroup !== null) continue;
        // if it's an unmarried Node, or if it's a Link Label Node, create a LayoutVertex for it
        if (node.isLinkLabel) {
          // get marriage Link
          var link = node.labeledLink;
          var spouseA = link?.fromNode;
          var spouseB = link?.toNode;
          // create vertex representing both husband and wife
          var vertex = net.addNode(node);
          // now define the vertex size to be big enough to hold both spouses
          vertex.width = (spouseA?.actualBounds.width || 0) + this.spouseSpacing + (spouseB?.actualBounds.width || 0);
          vertex.height = Math.max(spouseA?.actualBounds.height || 0, spouseB?.actualBounds.height || 0);
          vertex.focus = new go.Point(spouseA?.actualBounds.width || 0 + this.spouseSpacing / 2, vertex.height / 2);
        } else {
          // don't add a vertex for any married person!
          // instead, code above adds label node for marriage link
          // assume a marriage Link has a label Node
          var marriages = 0;
          // eslint-disable-next-line no-loop-func
          node.linksConnected.each(function(l) { if (l.isLabeledLink) marriages++; });
          if (marriages === 0) {
             vertex = net.addNode(node);
          } else if (marriages > 1) {
            multiSpousePeople.add(node);
          }
        }
      }
      // now do all Links
      it.reset();
      while (it.next()) {
         link = it.value;
        if (!(link instanceof go.Link)) continue;
        if (!link.isLayoutPositioned || !link.isVisible()) continue;
        if (nonmemberonly && link.containingGroup !== null) continue;
        // if it's a parent-child link, add a LayoutEdge for it
        if (!link.isLabeledLink) {
          var parent = net.findVertex(link.fromNode);  // should be a label node
          var child = net.findVertex(link.toNode);
          if (child !== null) {  // an unmarried child
            net.linkVertexes(parent, child, link);
          } else {  // a married child
            // eslint-disable-next-line no-loop-func
            link?.toNode?.linksConnected.each(function(l) {
              if (!l.isLabeledLink) return;  // if it has no label node, it's a parent-child link
              // found the Marriage Link, now get its label Node
              var mlab = l.labelNodes.first();
              // parent-child link should connect with the label node,
              // so the LayoutEdge should connect with the LayoutVertex representing the label node
              var mlabvert = net.findVertex(mlab);
              if (mlabvert !== null) {
                net.linkVertexes(parent, mlabvert, link);
              }
            });
          }
        }
      }

      while (multiSpousePeople.count > 0) {
        // find all collections of people that are indirectly married to each other
        var mnode = multiSpousePeople.first();
        var cohort = new go.Set();
        this.extendCohort(cohort, mnode);
        // then encourage them all to be the same generation by connecting them all with a common vertex
        var dummyvert = net.createVertex();
        net.addVertex(dummyvert);
        var mmarriages = new go.Set();
        // eslint-disable-next-line no-loop-func
        cohort.each(function(n: any) {
          n.linksConnected.each(function(l: any) {
            mmarriages.add(l);
          })
        });
        // eslint-disable-next-line no-loop-func
        mmarriages.each(function(link: any) {
          // find the vertex for the marriage link (i.e. for the label node)
          var mlab = link.labelNodes.first()
          var v = net.findVertex(mlab);
          if (v !== null) {
            net.linkVertexes(dummyvert, v, null);
          }
        });
        // done with these people, now see if there are any other multiple-married people
        multiSpousePeople.removeAll(cohort);
      }
    };


     // collect all of the people indirectly married with a person
     public extendCohort = (coll: any, node: any) => {
      if (coll.has(node)) return;
      coll.add(node);
      var lay = this;
      node.linksConnected.each(function(l: any) {
        if (l.isLabeledLink) {  // if it's a marriage link, continue with both spouses
          lay.extendCohort(coll, l.fromNode);
          lay.extendCohort(coll, l.toNode);
        }
      });
    };


   
   
    public assignLayers = () => {
      // go.LayeredDigraphLayout.prototype.assignLayers.call(this);
      var horiz = this.direction === 0.0 || this.direction === 180.0;
      // for every vertex, record the maximum vertex width or height for the vertex's layer
      var maxsizes: any[] = [];
      this.network.vertexes.each(function(v: any) {
        var lay = v.layer;
        var max = maxsizes[lay];
        if (max === undefined) max = 0;
        var sz = (horiz ? v.width : v.height);
        if (sz > max) maxsizes[lay] = sz;
      });
      // now make sure every vertex has the maximum width or height according to which layer it is in,
      // and aligned on the left (if horizontal) or the top (if vertical)
      this.network.vertexes.each(function(v: any) {
        var lay = v.layer;
        var max = maxsizes[lay];
        if (horiz) {
          v.focus = new go.Point(0, v.height / 2);
          v.width = max;
        } else {
          v.focus = new go.Point(v.width / 2, 0);
          v.height = max;
        }
      });
      // from now on, the LayeredDigraphLayout will think that the Node is bigger than it really is
      // (other than the ones that are the widest or tallest in their respective layer).
    };

    public commitNodes = () => {
      // go.LayeredDigraphLayout.prototype.commitNodes.call(this);
      // position regular nodes
      this.network.vertexes.each(function(v: any) {
        if (v.node !== null && !v.node.isLinkLabel) {
          v.node.position = new go.Point(v.x, v.y);
        }
      });
      // position the spouses of each marriage vertex
      var layout = this;
      this.network.vertexes.each(function(v: any) {
        if (v.node === null) return;
        if (!v.node.isLinkLabel) return;
        var labnode = v.node;
        var lablink = labnode.labeledLink;
        // In case the spouses are not actually moved, we need to have the marriage link
        // position the label node, because LayoutVertex.commit() was called above on these vertexes.
        // Alternatively we could override LayoutVetex.commit to be a no-op for label node vertexes.
        lablink.invalidateRoute();
        var spouseA = lablink.fromNode;
        var spouseB = lablink.toNode;
        // prefer fathers on the left, mothers on the right
        if (spouseA.data.s === "F") {  // sex is female
          var temp = spouseA;
          spouseA = spouseB;
          spouseB = temp;
        }
        // see if the parents are on the desired sides, to avoid a link crossing
        var aParentsNode = layout.findParentsMarriageLabelNode(spouseA);
        var bParentsNode = layout.findParentsMarriageLabelNode(spouseB);
        if (aParentsNode !== null && bParentsNode !== null && aParentsNode.position.x > bParentsNode.position.x) {
          // swap the spouses
          var mtemp: any = spouseA;
          spouseA = spouseB;
          spouseB = mtemp;
        }
        spouseA.position = new go.Point(v.x, v.y);
        spouseB.position = new go.Point(v.x + spouseA.actualBounds.width + layout.spouseSpacing, v.y);
        if (spouseA.opacity === 0) {
          var pos = new go.Point(v.centerX - spouseA.actualBounds.width / 2, v.y);
          spouseA.position = pos;
          spouseB.position = pos;
        } else if (spouseB.opacity === 0) {
          var mpos: any = new go.Point(v.centerX - spouseB.actualBounds.width / 2, v.y);
          spouseA.position = mpos;
          spouseB.position = mpos;
        }
      });
      // position only-child nodes to be under the marriage label node
      this.network.vertexes.each((v: any) => {
        if (v.node === null || v.node.linksConnected.count > 1) return;
        var mnode = layout.findParentsMarriageLabelNode(v.node);
        if (mnode !== null && mnode.linksConnected.count === 1) {  // if only one child
          var mvert = layout.network.findVertex(mnode);
          var newbnds = v.node.actualBounds.copy();
          newbnds.x = mvert.centerX - v.node.actualBounds.width / 2;
          // see if there's any empty space at the horizontal mid-point in that layer
          var overlaps = this.diagramRef?.current?.getDiagram()?.findObjectsIn(newbnds, function(x: any) { return x.part; }, function(p: any) { return p !== v.node; }, true);
          if (overlaps?.count === 0) {
            v.node.move(newbnds.position);
          }
        }
      });
    };

    public findParentsMarriageLabelNode = function(node: any) {
      var it = node.findNodesInto();
      while (it.next()) {
        var n = it.value;
        if (n.isLinkLabel) return n;
      }
      return null;
    };
    
 

    public render() {
      return (
        <ReactDiagram
          ref={this.diagramRef}
          divClassName='diagram-component'
          initDiagram={this.initDiagram}
          nodeDataArray={this.props.nodeDataArray}
          // linkDataArray={this.props.linkDataArray}
          modelData={this.props.modelData}
          onModelChange={this.props.onModelChange}
          skipsDiagramUpdate={this.props.skipsDiagramUpdate}
        />
      );
    }
  }

function donothing() {
  return;
}

