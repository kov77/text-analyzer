import React, { useState } from 'react';
import { Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Entity } from '../../../types/textRazor';
import styles from './Analyze.module.scss';
import BasicPagination from "../../common/BasicPagination";
import {
  entityConfidenceData,
  entityTypeCounts,
  highlightEntitiesInSentence,
  splitTextIntoSentences
} from "../../../utils/utils";

type AnalyzePageProps = {
  setMode: (mode: 'uploading' | 'analyzing') => void;
  entities: Entity[];
  text: string;
};

const ITEMS_PER_PAGE = 10;

export const AnalyzePage = ({ setMode, entities, text }: AnalyzePageProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const typeCounts = entityTypeCounts(entities);
  const confidenceData = entityConfidenceData(entities);
  const sentences = splitTextIntoSentences(text);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentSentences = sentences.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sentences.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className={styles.wrapper}>
      <Button variant="secondary" onClick={() => setMode('uploading')}>
        Choose another file
      </Button>
      <Row className={styles.chartsRow}>
        <Col md={6}>
          <h4>Top 10 Entity Types</h4>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie data={typeCounts} dataKey="count" nameKey="type" outerRadius={100} label>
                {typeCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col md={6}>
          <h4>Top 25 Entities by Confidence</h4>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={confidenceData}>
              <XAxis dataKey="entity" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="confidence" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Analyzed text</h4>
          <ListGroup className={styles.listGroup}>
            {currentSentences.map((sentence, index) => (
              <ListGroup.Item key={index}>
                <span dangerouslySetInnerHTML={{ __html: highlightEntitiesInSentence(sentence, entities) }} />
              </ListGroup.Item>
            ))}
          </ListGroup>
          <BasicPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
};
