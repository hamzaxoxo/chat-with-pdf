import Image from 'next/image';

type MessageBubbleProps = {
  message: string;
  isSender: boolean;
  avatar: string;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isSender, avatar }) => {
  return (
    <div className={`col-start-${isSender ? '6' : '1'} col-end-${isSender ? '13' : '8'} p-3 rounded-lg`}>
      <div className={`flex items-center ${isSender ? 'justify-start flex-row-reverse' : ''}`}>
        <div className="flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0">
          <Image className="object-contain" src={avatar} alt="avatar" width={80} height={80} />
        </div>
        <div className={`relative ${isSender ? 'mr-3 bg-indigo-100' : 'ml-3 bg-white'} text-sm py-2 px-4 shadow rounded-t-xl rounded-bl-xl`}>
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
