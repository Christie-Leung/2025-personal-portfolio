/* eslint-disable */
import { StrictBuilder } from 'builder-pattern';



import { MessageBlock } from './MessageBlock';
import { MessageBlocks } from './MessageBlocks';
import { ParagraphBlock } from './ParagraphBlock';
import { HeadingBlock } from './HeadingBlock';
import { DividerBlock } from './DividerBlock';
import { CodeBlock } from './CodeBlock';
import { TableBlock } from './TableBlock';
import { ImageBlock } from './ImageBlock';
import { ListBlock } from './ListBlock';

interface IMessageBlocks {
  blocks: MessageBlock[];
}


export class MessageBlocks implements IMessageBlocks {
  declare blocks: MessageBlock[];


  public static builder = () => {
  return StrictBuilder<IMessageBlocks>();
    }
  }

