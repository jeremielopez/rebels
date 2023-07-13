import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import SplitType from 'split-type';

gsap.registerPlugin(CustomEase);

// Create a custom ease
CustomEase.create("custom", "M0,0 C0.498,0.032 0.724,0.062 0.768,0.088 0.863,0.145 0.878,0.972 1,1 ");

export class RebelsAnimation {
    private readonly DEFAULT_DURATION = 1;
    private readonly DEFAULT_EASING = 'ease-in-out';
    private readonly DEFAULT_DELAY = 0;

    constructor() {
        this.init();
    }

    private async init(): Promise<void> {
        this.animateStars();
        this.animateCursor();
        await this.removeLoader();
        this.animateNavbar();
        this.handleClickNavbar();
        this.animateHero();
        this.animateXwing();
    }

    private removeLoader(): Promise<void> {
        const loader = document.getElementById('loader');

        return new Promise((resolve) => {
            setTimeout(() => {
                loader?.remove();
                resolve();
            }, 3000);
        });
    }

    private animateStars(): void {
        const z1 = document.getElementsByClassName("z-1")[0];
        const z2 = document.getElementsByClassName("z-2")[0];
        const z3 = document.getElementsByClassName("z-3")[0];
        const ratio = 0.05;
        let x;
        let y;
        document.addEventListener("mousemove", function (e) {
            x = e.pageX;
            y = e.pageY;
        });
        requestAnimationFrame(function animation() {
            z1.style.transform = "translate(" + x * ratio + "px," + y * ratio + "px)";
            z2.style.transform =
                "translate(" +
                (x * ratio) / 2 +
                "px," +
                (y * ratio) / 2 +
                "px) rotate(217deg)";
            z3.style.transform =
                "translate(" +
                (x * ratio) / 3 +
                "px," +
                (y * ratio) / 3 +
                "px) rotate(71deg)";
            requestAnimationFrame(animation);
        });
    }

    private animateNavbar(): void {
        const tl = gsap.timeline();


        tl.fromTo('.navbar-item', { translateY: '-100%', opacity: 0 },
            {
                translateY: '0%',
                opacity: 1,
                stagger: 0.2,
                duration: this.DEFAULT_DURATION,
                ease: this.DEFAULT_EASING,
                delay: this.DEFAULT_DELAY
            }
        );

        tl.fromTo('.navbar-cta', { translateX: '100%', opacity: 0 },
            {
                translateX: '0%',
                opacity: 1,
                duration: this.DEFAULT_DURATION,
                ease: this.DEFAULT_EASING,
                delay: this.DEFAULT_DELAY
            },
            0
        );

        tl.fromTo('.navbar-logo', { translateX: '-100%', opacity: 0 },
            {
                translateX: '0%',
                opacity: 1,
                duration: this.DEFAULT_DURATION,
                ease: this.DEFAULT_EASING,
                delay: this.DEFAULT_DELAY
            },
            0
        );

        tl.fromTo('.navbar-bar', { scaleX: 0, opacity: 0 }, {
            scaleX: 1,
            opacity: 1,
            duration: 0.5,
            ease: this.DEFAULT_EASING,
            delay: this.DEFAULT_DELAY
        }
        );

        const cta = gsap.timeline();

        cta.fromTo('.navbar-cta', { maxWidth: 0 }, { maxWidth: '100%', duration: 1, ease: 'custom' });
        cta.fromTo('.navbar-cta-text', { translateY: '150%' }, { translateY: '0', duration: 0.5, ease: this.DEFAULT_EASING, delay: this.DEFAULT_DELAY });
    }

    private handleClickNavbar(): void {
        const items = document.querySelectorAll('.navbar-item');

        items.forEach((item) => {
            item.addEventListener('click', () => {
                const tl = gsap.timeline();

                tl.to('.navbar-bar', {
                    left: item.getBoundingClientRect().left - items.item(0).getBoundingClientRect().left,
                    duration: 0.5,
                    ease: 'ease-in-out'
                });
            });
        });
    }

    private animateHero(): void {
        const tl = gsap.timeline();

        tl.fromTo('.hero-title', { translateY: '50%', opacity: 0 }, {
            translateY: '0%',
            opacity: 1,
            duration: this.DEFAULT_DURATION,
            ease: this.DEFAULT_EASING
        }, 0);

        tl.fromTo('.hero-content', { translateY: '50%', opacity: 0 }, {
            translateY: '0%',
            opacity: 1,
            duration: this.DEFAULT_DURATION,
            ease: this.DEFAULT_EASING,
            delay: -0.5
        });

        tl.fromTo('.hero-cta', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'ease' }, 1);
        tl.fromTo('.hero-cta', { maxWidth: 0 }, { maxWidth: '100%', duration: 1, ease: 'custom' });
        tl.fromTo('.hero-cta-text', { translateY: '150%' }, { translateY: '0', duration: 0.5, ease: this.DEFAULT_EASING, delay: this.DEFAULT_DELAY });

        const droid = new SplitType('.hero-droid', { types: 'chars' });

        tl.fromTo(droid.chars, { opacity: 0 }, {
            opacity: 1,
            stagger: 0.1,
            duration: this.DEFAULT_DURATION,
            ease: this.DEFAULT_EASING
        }, 1);

        tl.fromTo('.hero-deathstar', { translateY: '-10%', opacity: 0, scale: 0.8 }, {
            translateY: '0%',
            opacity: 1,
            scale: 1,
            duration: 3,
            ease: this.DEFAULT_EASING,
        }, 0);
    }

    private hasHoverable(element: HTMLElement): boolean {
        let parent = element.parentElement;
        while (parent) {
            if (parent.hasAttribute("data-hoverable")) {
                return true;
            }
            parent = parent.parentElement;
        }

        if (element.hasAttribute("data-hoverable")) {
            return true;
        }

        return false;
    }

    private getFarthestHoverable(element: HTMLElement): HTMLElement | null {
        const parent = element.parentElement;
        if (parent && parent.hasAttribute("data-hoverable")) {
            const farthestParent = this.getFarthestHoverable(parent);
            if (farthestParent) {
                return farthestParent;
            } else {
                return parent;
            }
        } else {
            if (element.hasAttribute("data-hoverable")) {
                return element;
            }

            return null;
        }
    }

    private animateCursor(): void {
        const cursor = document.getElementById('cursor');

        document.addEventListener('mousemove', (e) => {
            if (e.target instanceof HTMLElement) {
                const hoverable = this.hasHoverable(e.target);
                const element = this.getFarthestHoverable(e.target);

                if (hoverable && element) {
                    const { top, left } = element.getBoundingClientRect();
                    cursor?.classList.add('cursor-hover');
                    cursor?.setAttribute('style', `top: ${top + element.offsetHeight / 2}px; left: ${left + element.offsetWidth / 2}px;`);
                    cursor?.style.setProperty('width', element.offsetWidth + 'px');
                    cursor?.style.setProperty('height', element.offsetHeight + 'px');

                    const computedStyle = window.getComputedStyle(element);

                    if (computedStyle.borderWidth !== '0px' || element.dataset.hoverable === 'transparent') {
                        cursor?.style.setProperty('background-color', 'rgba(0, 0, 0, 0)');
                    }
                } else {
                    cursor?.classList.remove('cursor-hover');
                    cursor?.setAttribute('style', `top: ${e.clientY}px; left: ${e.clientX}px;`);
                }
            }
        });
    }

    private animateXwing(): void {
        const tl = gsap.timeline();

        tl.fromTo('#xwing', { translateY: '100%', opacity: 0, scale: 0.2 }, {
            translateY: '0%',
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: this.DEFAULT_EASING,
        }, 0);

        tl.fromTo('#xwing2', { translateY: '100%', opacity: 0, scale: 0.5 }, {
            translateY: '0%',
            opacity: 1,
            duration: 2,
            scale: 1,
            ease: this.DEFAULT_EASING,
        }, 0);

        tl.fromTo('#deathstar', { translateY: '100%', opacity: 0, scale: 0 }, {
            translateY: '0%',
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: this.DEFAULT_EASING,
        }, 0);
    }
}