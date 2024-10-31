import React, { useEffect, useRef, useState } from 'react'
import { Document, Page } from 'react-pdf'

interface PdfOverviewProps {
  file: File
}

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}

export const PdfOverview: React.FC<PdfOverviewProps> = ({
  file
}: PdfOverviewProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null)
  const [parentWidth, setParentWidth] = useState(0)

  useEffect(() => {
    const updateSize = (): void => {
      if (parentRef.current) {
        const width = parentRef.current.getBoundingClientRect().width
        setParentWidth(width)
      }
    }
    updateSize()
  }, [])

  return (
    <div style={styles.container} ref={parentRef}>
      <Document file={file}>
        <Page pageNumber={1} width={parentWidth} />
      </Document>
    </div>
  )
}
