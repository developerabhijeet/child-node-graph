import { useState } from 'react';
import './App.css';
import CustomTree from './Components/Tree';
import { treeData } from './Utils/constant';

function App() {
  const [selectedNode, setSelectedNode] = useState(false);
  const [data, setData] = useState(treeData);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [clickedNode, setClickedNode] = useState([])

  const handleNodeClick = (node) => {
    if (selectedNodes.includes(node.data.name)) {
      // Node is already selected, deselect it
      setSelectedNodes(
        selectedNodes.filter((selectedNode) => selectedNode !== node.data.name)
      );
    } else {
      // Node is not selected, select it
      setSelectedNodes([...selectedNodes, node.data.name]);
    }
  };

  const handleGroupNodes = () => {
    if (selectedNodes.length > 1) {
      const groupNode = {
        name: 'Group',
        children: selectedNodes.map((nodeName) => {
          // Find the selected node in the data tree
          return findNodeByName(data, nodeName);
        }),
      };

      // Update the tree data structure to include the group node
      const updatedData = {
        ...data,
        children: data.children.map((child) => {
          if (selectedNodes.includes(child.name)) {
            return groupNode;
          }
          return child;
        }),
      };

      setData(updatedData);
      setSelectedNodes([]);
    }
  };

  // Function to find a node by name in the tree data
  const findNodeByName = (node, nodeName) => {
    if (node.name === nodeName) {
      return node;
    } else if (node.children) {
      for (let child of node.children) {
        const result = findNodeByName(child, nodeName);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };


  return (
    <div>
      <h1>Collapsible Tree Example</h1>

      <button onClick={handleGroupNodes}>Group Nodes</button>
      <div className="test-me">
        <p>Visited Node History</p>
        {selectedNode &&
          clickedNode &&
          clickedNode.length > 0 &&
          // <span>{clickedNode?.data?.name}iiiiiiii</span>
          clickedNode.map((node) => <p>{node}</p>)}
      </div>
      <div style={{ width: 'auto', height: '500px' }}>
        {CustomTree(
          data,
          handleNodeClick,
          clickedNode,
          setSelectedNode,
          selectedNode,
          setClickedNode
        )}
      </div>
    </div>
  );
}

export default App;
