// header 上icon
import React from 'react';
import type { ReactNode, ReactElement, MouseEvent } from 'react';
import { Badge } from 'antd';
import { GithubFilled, FacebookFilled } from '@ant-design/icons';
interface Props {
    className: string;
    count: number;
    icon: string;
    onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function NavIcon({ count, className, icon, onClick }: Props): ReactElement {
    function RenderIcon({ icon }: { icon: string }): ReactElement | null {
        const iconMap: Map<string, ReactNode> = new Map([
            ['github', <GithubFilled></GithubFilled>],
            ['facebook', <FacebookFilled></FacebookFilled>]
        ]);
        if (iconMap.has(icon)) {
            return iconMap.get(icon) as ReactElement;
        }
        return null;
    }

    return (
        <div onClick={onClick} className={className}>
            <Badge count={count} size="small" overflowCount={10} offset={[5, 0]}>
                <div style={{ fontSize: '20px' }}>
                    <RenderIcon icon={icon}></RenderIcon>
                </div>
            </Badge>
        </div>
    );
}
