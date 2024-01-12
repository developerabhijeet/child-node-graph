import React from 'react'
import Tree from 'react-d3-tree';
import './CustomTree.css';

const CustomTree = (
  node,
  onClick,
  clickedNode,
  setSelectedNode,
  selectedNode,
  setClickedNode
) => {
  return (
    <>
      <Tree
        data={node}
        collapsible={true}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        onNodeClick={onClick}
        // onNodeMouseOver={(node) => {
        //   setSelectedNode(true);
        //   setClickedNode([...clickedNode, node.data.name]);
        // }}
        data-tip
        data-for="node-tooltip"
        nodeLabelComponent={{
          render: <CustomLabel />,
          foreignObjectWrapper: {
            // y: 60, // Adjust the tooltip position as needed
            width: 100,
            height: 20,
          },
        }}
        translate={{ x: 50, y: 100 }}
      />
    </>
  );
};

const CustomLabel = ({nodeData}) => {
  return (
    <div data-tip data-for="node-tooltip">
      {nodeData.name}
    </div>
  );
}

export default CustomTree;