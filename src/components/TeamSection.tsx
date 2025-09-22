import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Award,
  Users,
  Code,
  Brain,
  Satellite
} from 'lucide-react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Dr. Priya Sharma",
      role: "Lead AI Researcher",
      expertise: "Machine Learning & Computer Vision",
      avatar: "PS",
      bio: "PhD in Computer Vision from IIT Bombay. Specialized in satellite imagery analysis and deep learning algorithms.",
      skills: ["Deep Learning", "Computer Vision", "Python", "TensorFlow"],
      color: "from-primary/20 to-primary/5"
    },
    {
      name: "Arjun Patel",
      role: "Geospatial Engineer",
      expertise: "Remote Sensing & GIS",
      avatar: "AP",
      bio: "Expert in satellite data processing and geospatial analysis with 8+ years at ISRO.",
      skills: ["GIS", "Remote Sensing", "QGIS", "Earth Engine"],
      color: "from-accent/20 to-accent/5"
    },
    {
      name: "Sneha Krishnan",
      role: "Full-Stack Developer",
      expertise: "Web Development & Cloud Computing",
      avatar: "SK",
      bio: "Full-stack developer specializing in scalable web applications and cloud infrastructure.",
      skills: ["React", "Node.js", "AWS", "Docker"],
      color: "from-success/20 to-success/5"
    },
    {
      name: "Rajesh Kumar",
      role: "Data Scientist",
      expertise: "Statistical Analysis & ML",
      avatar: "RK",
      bio: "Data scientist with expertise in statistical modeling and machine learning for environmental monitoring.",
      skills: ["Python", "R", "Statistics", "Scikit-learn"],
      color: "from-warning/20 to-warning/5"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "ISRO Innovation Award",
      description: "Best Satellite Application Project 2023"
    },
    {
      icon: Code,
      title: "Open Source Contribution",
      description: "500+ GitHub stars on satellite analysis tools"
    },
    {
      icon: Brain,
      title: "Research Publications",
      description: "12 peer-reviewed papers in remote sensing"
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Deployed in 15+ conservation projects"
    }
  ];

  return (
    <section id="team" className="py-24 space-bg">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-6">
            <Users className="w-4 h-4 text-success" />
            <span className="font-montserrat text-sm font-medium text-muted-foreground">
              Meet the Team
            </span>
          </div>
          
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl mb-6">
            <span className="bg-gradient-cosmic bg-clip-text text-transparent">
              Expert Team
            </span>
          </h2>
          
          <p className="font-montserrat text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A multidisciplinary team of researchers, engineers, and developers 
            passionate about advancing satellite-based environmental monitoring.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <Card key={index} className="glass-card border-border/50 hover:shadow-glow-soft transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                {/* Avatar */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="font-orbitron font-bold text-xl text-foreground">
                    {member.avatar}
                  </span>
                </div>
                
                {/* Name & Role */}
                <h3 className="font-orbitron font-semibold text-lg text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="font-montserrat font-medium text-primary text-sm mb-2">
                  {member.role}
                </p>
                <p className="font-montserrat text-xs text-muted-foreground mb-4">
                  {member.expertise}
                </p>
                
                {/* Bio */}
                <p className="font-montserrat text-xs text-muted-foreground leading-relaxed mb-4">
                  {member.bio}
                </p>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {member.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary" 
                      className="glass-card text-xs font-montserrat"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                {/* Social Links */}
                <div className="flex justify-center space-x-2">
                  <Button variant="outline" size="sm" className="glass-card p-2">
                    <Github className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="glass-card p-2">
                    <Linkedin className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="glass-card p-2">
                    <Mail className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <div className="glass-card p-8 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-orbitron font-semibold text-2xl text-foreground mb-4">
              Team Achievements
            </h3>
            <p className="font-montserrat text-muted-foreground">
              Recognition and impact in the field of satellite-based environmental monitoring
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-orbitron font-semibold text-lg mb-2 text-foreground">
                    {achievement.title}
                  </h4>
                  <p className="font-montserrat text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <h3 className="font-orbitron font-semibold text-xl text-foreground mb-4">
            Interested in Collaboration?
          </h3>
          <p className="font-montserrat text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for new partnerships and opportunities to advance 
            satellite-based environmental monitoring. Get in touch with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-cosmic hover:shadow-glow-primary font-montserrat font-semibold">
              <Mail className="w-4 h-4 mr-2" />
              Contact Team
            </Button>
            <Button variant="outline" size="lg" className="glass-card border-primary/30 hover:border-primary font-montserrat font-semibold">
              <Satellite className="w-4 h-4 mr-2" />
              Join Research
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;