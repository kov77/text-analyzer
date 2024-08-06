import React, {useState} from 'react';
import FileUploader from '../../common/FileUploader';
import {processText} from "../../../api/textRazorAPI";
import { Entity } from '../../../types/textRazor';
import styles from "./Dashboard.module.scss"

import FullScreenLoader from "../../common/FullScreenLoader";
import { AnalyzePage } from '../Analyze';
const Dashboard: React.FC = () => {
  const[text, setText] = useState<string>('');
  const[entities, setEntities] = useState<Entity[]>([]);
  const[mode, setMode]  = useState<'uploading' | 'analyzing'>('uploading')
  const[isLoading, setIsLoading]  = useState(false)

  const handleFileUpload = async (text: string) => {
    setText(text)
    setIsLoading(true)
    try {
      const response = await processText(text);
      setEntities(response.data.response.entities);
      setMode("analyzing")
    } catch (error) {
      console.error('Error processing text:', error);
    } finally {
      setIsLoading(false)
    }
  };

  if(isLoading) return <FullScreenLoader/>

  return (
    <div className={styles.wrapper}>
      {mode === 'uploading' && <FileUploader onFileUpload={handleFileUpload} />}
      {mode === 'analyzing' && <AnalyzePage setMode={setMode} entities={entities} text={text}/>}
    </div>
  );
};

export default Dashboard;
