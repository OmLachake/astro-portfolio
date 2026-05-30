export interface NavItem {
    label: string;
    href: string;
}

export interface NavData {
    main: NavItem[];
    devOnly: NavItem[];
    social: NavItem[];
}

export interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    year?: string;
    liveUrl?: string;
    repoUrl?: string;
}
