/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { MessageBlocks } from './MessageBlocks';
import { ParagraphBlock } from './ParagraphBlock';
import { HeadingBlock } from './HeadingBlock';
import { DividerBlock } from './DividerBlock';
import { CodeBlock } from './CodeBlock';
import { TableBlock } from './TableBlock';
import { ImageBlock } from './ImageBlock';
import { ListBlock } from './ListBlock';

export type MessageBlock = ParagraphBlock | HeadingBlock | DividerBlock | CodeBlock | TableBlock | ImageBlock | ListBlock;

