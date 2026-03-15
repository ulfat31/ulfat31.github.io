const skills = ['build', 'teach', 'design', 'develop', 'collaborate', 'create', 'innovate'];
let index = 0;
let skillInterval;
const skillElem = document.getElementById('skill');
const intro = document.getElementById('intro');
const icanElem = document.getElementById('ican');

window.addEventListener('load', () => {
  // Start sequence
  setTimeout(() => intro.classList.add('show'), 100);

  // Start skills after "I can" shows
  setTimeout(() => startSkillRotation(), 1200);

  // Fade out intro after all skills shown once (7 skills × 0.7s = 4.9s + 1.2s delay = 6.1s total)
  setTimeout(() => intro.classList.add('hide'), 6100);
});

function startSkillRotation() {
  changeSkill();
  skillInterval = setInterval(() => {
    changeSkill();
    if (index >= skills.length) {
      clearInterval(skillInterval); // Stop after showing all skills once
    }
  }, 700); // Slower so all skills are visible: 0.7s per skill
}

function changeSkill() {
  const newSkill = document.createElement('span');
  newSkill.textContent = skills[index];
  newSkill.style.position = 'relative';
  newSkill.style.width = 'auto';
  newSkill.style.whiteSpace = 'nowrap';
  newSkill.style.animation = 'scrollUp 0.35s ease-out forwards';

  // Remove old skill immediately without waiting
  if (skillElem.firstChild) {
    skillElem.firstChild.remove();
  }

  skillElem.appendChild(newSkill);

  // Adjust container width immediately
  requestAnimationFrame(() => {
    const skillWidth = newSkill.offsetWidth;
    skillElem.style.width = skillWidth + 'px';
    
    // Center the entire sentence
    const offset = (skillWidth - 40) / 2;
    icanElem.style.transform = `translateX(${offset}px)`;
  });

  index++;
}

// Skill Item Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const skillItems = document.querySelectorAll('.skill-item');
  const skillDescriptions = document.querySelectorAll('.skill-description');
  
  skillItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      
      const skillType = item.getAttribute('data-skill');
      const targetDescription = document.querySelector(`.skill-description[data-skill="${skillType}"]`);
      
      // Close all other skill items and descriptions
      skillItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      skillDescriptions.forEach(desc => {
        if (desc !== targetDescription) {
          desc.classList.remove('active');
        }
      });
      
      // Toggle current item and description
      item.classList.toggle('active');
      if (targetDescription) {
        targetDescription.classList.toggle('active');
      }
    });
  });
  
  // Close skill descriptions when clicking outside
  document.addEventListener('click', () => {
    skillItems.forEach(item => {
      item.classList.remove('active');
    });
    skillDescriptions.forEach(desc => {
      desc.classList.remove('active');
    });
  });
});