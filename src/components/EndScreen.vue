<script setup lang="ts">
import { useEndScreenStore } from '../stores/endScreen';
import Button from './Button.vue';
import onehundredDollars from '../assets/onehundred-usd.jpg';
import { playSound } from '../helperFuncs';
import mlgSound from '../assets/sounds/mgl-short.mp3';
import moneyPrintingSound from '../assets/sounds/money-printing.mp3'
import trump from '../assets/trump.jpg';
import illuminati from '../assets/illuminati.png';
import ak47 from '../assets/AK-47.png';
import snoopDog from '../assets/snoopdog.mp4';
import wanted from '../assets/wanted.png';
import bustedSound from '../assets/sounds/busted.mp3';
import policeSirensSound from '../assets/sounds/police.mp3';

const endScreen = useEndScreenStore();

function spawnBills(count = 300) {
    for (let i = 0; i < count; i++) {
        const delay = Math.random() * 9000;
        setTimeout(() => createBill(), delay);
    }
    playSound(mlgSound);
    playSound(moneyPrintingSound);
    setTimeout(() => playSound(moneyPrintingSound), 3000);
}
function createBill() {
    const img = document.createElement('img');
    img.src = onehundredDollars;
    img.classList.add('falling-bill');

    const randomX = Math.floor(Math.random() * 100) + 1;
    img.style.left = `${randomX}vw`;

    const scale = 1 + (Math.random() * 0.2 - 0.1);
    const rx = `${Math.random() * 120 - 60}deg`;
    const ry = `${Math.random() * 120 - 60}deg`;
    const rz = `${Math.random() * 120 - 60}deg`;
    const rxEnd = `${Math.random() * 120 - 60}deg`;
    const ryEnd = `${Math.random() * 120 - 60}deg`;
    const rzEnd = `${Math.random() * 120 - 60}deg`;
    
    img.style.setProperty('--scale', scale.toString());
    img.style.setProperty('--rx', rx);
    img.style.setProperty('--ry', ry);
    img.style.setProperty('--rz', rz);
    img.style.setProperty('--rx-end', rxEnd);
    img.style.setProperty('--ry-end', ryEnd);
    img.style.setProperty('--rz-end', rzEnd);

    document.body.appendChild(img);
    img.addEventListener('animationend', () => img.remove());
}
function spawnFlyingImages(images: string[], count = 10) {
    if (!images.length) return
    let index = 0;

    for (let i = 0; i < count; i++) {
        const delay = Math.random() * 7000;

        setTimeout(() => {
        const imgSrc = images[index % images.length];
        index++;
        spawnFlyingImage(imgSrc!);
        }, delay);
    }
}
function spawnFlyingImage(src: string) {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('fly-item');

    const fromLeft = Math.random() < 0.5;
    const startX = fromLeft ? '-20vw' : '120vw';
    const endX = fromLeft
        ? `${60 + Math.random() * 40}vw`
        : `${Math.random() * 40}vw`;
    const startY = `${10 + Math.random() * 60}vh`;
    const endY = `${10 + Math.random() * 70}vh`;
    const rxStart = Math.random() * 360;
    const ryStart = Math.random() * 360;
    const rzStart = (Math.random() * 40) - 20;
    const rxEnd = rxStart + 360;
    const ryEnd = ryStart + 360;
    const rzEnd = (Math.random() * 80) - 40;
    const scale = 1 + (Math.random() * 0.2 - 0.1);
    
    img.style.setProperty('--scale', scale.toString());
    img.style.setProperty('--start-x', startX);
    img.style.setProperty('--end-x', endX);
    img.style.setProperty('--start-y', startY);
    img.style.setProperty('--end-y', endY);
    img.style.setProperty('--rx', `${rxStart}deg`);
    img.style.setProperty('--ry', `${ryStart}deg`);
    img.style.setProperty('--rz', `${rzStart}deg`);
    img.style.setProperty('--rx-end', `${rxEnd}deg`);
    img.style.setProperty('--ry-end', `${ryEnd}deg`);
    img.style.setProperty('--rz-end', `${rzEnd}deg`);

    document.body.appendChild(img);
    img.addEventListener('animationend', () => img.remove());
}
function displaySnoopDog() {
    setTimeout(() => {
        const vid = document.getElementById('snoop');
        if (!vid) return;
        vid.style.display = 'block';
    }, 4000);
}
function createCenterPop(src: string) {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('center-pop');

    document.body.appendChild(img);

    img.addEventListener('animationend', () => img.remove());
}
function policeFlash() {
    const blue = document.createElement('div');
    const red = document.createElement('div');

    blue.classList.add('police', 'police-blue');
    red.classList.add('police', 'police-red');

    document.body.appendChild(blue);
    document.body.appendChild(red);

    setTimeout(() => {
        blue.remove();
        red.remove();
    }, 50);
}
function policeFlashes(timeInterval: number) {
    const id = setInterval(() => {
        policeFlash();
    }, 100);

    setTimeout(() => clearInterval(id), timeInterval);
}


if (endScreen.type === 'victory') {
    spawnBills();
    spawnFlyingImages([trump, illuminati, ak47], 6);
    displaySnoopDog();
} else if (endScreen.type === 'defeat') {
    createCenterPop(wanted);
    policeFlashes(8000);
    playSound(policeSirensSound);
    playSound(bustedSound)
}
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            @click="endScreen.actionCallback?.(); endScreen.closeModal();">
        </div>
        <div
        class="
            relative z-[60]
            p-6
            bg-[#c8b8a8] text-[#2a1f1a]
            font-bold tracking-wide
            border-[3px] border-[#5a4a3a]
            shadow-[5px_5px_0_0_#7c6a58]
            rounded-md
            transition-all
            animate-[popIn_0.25s_ease-out]
            w-[90%] max-w-md text-center">
            <h1 class="text-3xl mb-4">{{ endScreen.title }}</h1>

            <p class="mb-6">{{ endScreen.description }}</p>
        
            <Button :text="endScreen.reset ? 'Reset Game' : 'Continue'" @click="endScreen.actionCallback?.(); endScreen.closeModal();" />
        </div>
        <video id="snoop" :src="snoopDog" autoplay muted />
    </div>
</template>


<style>
    @keyframes popIn {
        0% { transform: scale(0.7); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
    }
    @keyframes billFall {
        0% {
            transform: translateY(-100px) rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(var(--rz)) scale(var(--scale));
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotateX(var(--rx-end)) rotateY(var(--ry-end)) rotateZ(var(--rz-end)) scale(var(--scale));
            opacity: 0;
        }
    }
    @keyframes flyAcross {
        0% {
            transform:
            translateX(var(--start-x))
            translateY(var(--start-y))
            rotateX(var(--rx))
            rotateY(var(--ry))
            rotateZ(var(--rz))
            scale(var(--scale));
            opacity: 1;
        }
        100% {
            transform:
            translateX(var(--end-x))
            translateY(var(--end-y))
            rotateX(var(--rx-end))
            rotateY(var(--ry-end))
            rotateZ(var(--rz-end))
            scale(var(--scale));
            opacity: 0;
            }
    }
    @keyframes popGrow {
        0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.5;
        }
        100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
    }
    @keyframes policeBlink {
        0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
        }
        40% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.8;
        }
        100% {
            transform: translate(-50%, -50%) scale(1.6);
            opacity: 0;
        }
    }
    .police {
        z-index: 55;
        position: fixed;
        width: 50vw;
        height: 100dvh;
        opacity: 0.15;
        pointer-events: none;
    }
    .police-blue {
        background-color: rgba(0, 0, 255, 0.6);
        top: 0;
        left: 0;
    }
    .police-red {
        background-color: rgba(255, 0, 0, 0.6);
        top: 0;
        right: 0;
    }
    .center-pop {
        z-index: 55;
        position: fixed;
        width: 400px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.5);
        pointer-events: none;
        z-index: 999;
        animation: popGrow 10s ease-out forwards;
    }
    .falling-bill {
        z-index: 55;
        position: fixed;
        top: 0;
        width: 80px;
        pointer-events: none;
        animation: billFall 2s linear forwards;
    }
    .fly-item {
        z-index: 55;
        position: fixed;
        top: 0;
        width: 400px;
        height: auto;
        pointer-events: none;
        animation: flyAcross 5s ease-out forwards;
    }
    #snoop {
        z-index: 55;
        position: fixed;
        bottom: 0;
        left: 0;
        height: 400px;
        display: none;
        pointer-events: none;
        mix-blend-mode: screen;
    }
</style>
