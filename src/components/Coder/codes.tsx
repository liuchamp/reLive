import React, { useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Use your chosen theme

// Make sure to import the necessary languages
import 'prismjs/components/prism-python'; // or any other language you need
import 'prismjs/components/prism-go'; // or any other language you need
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styled from 'styled-components';

const CodeContainer = styled.div`
  position: relative;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin: 20px 0;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 3px;

  &:hover {
    background: #0056b3;
  }

  &:active {
    background: #004085;
  }
`;


type CodeBlockProps = {
    code: string;
    language: string;
    copyButton?: boolean;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, copyButton = false }) => {
    React.useEffect(() => {
        Prism.highlightAll();
    }, []);


    const [copied, setCopied] = useState(false);

    const handleMouseUp = () => {
        if (window?.getSelection) {
            const selectedText = window.getSelection()?.toString();
            if (selectedText) {
                console.log('选中的文本:', selectedText);
            }
        }
    };

    if (!copyButton) {
        return (
            <CodeContainer>
                <pre onMouseUp={handleMouseUp}>
                    <code className={`language-${language}`}>
                        {code}
                    </code>
                </pre>
            </CodeContainer>
        );
    }
    return (
        <CodeContainer>
            <pre onMouseUp={handleMouseUp}>
                <code className={`language-${language}`}>
                    {code}
                </code>
            </pre>
            <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
                <CopyButton>{copied ? 'Copied!' : 'Copy'}</CopyButton>
            </CopyToClipboard>
        </CodeContainer>
    );
};

export default CodeBlock;