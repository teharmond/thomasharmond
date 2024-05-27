"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EmailList from "@/components/unessay/EmailList";
import Sidebar from "@/components/unessay/sidebar";
import {
  AlarmClock,
  Archive,
  ArchiveX,
  EllipsisVertical,
  Forward,
  Reply,
  ReplyAll,
  Tag,
  Folder,
  Trash,
} from "lucide-react";
import React from "react";

export default function page() {
  return (
    <>
      <div className="flex felx-row h-screen w-full ">
        <Sidebar />
        <EmailList />
        <div className="bg-white w-full overflow-scroll">
          <div className="w-full h-12 font-semibold text-[15px] p-2 border-b border-gray-300 flex items-center justify-between">
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="justify-center">
                <Archive className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="justify-center">
                <ArchiveX className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="justify-center">
                <Trash className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" />
              <Button size="icon" variant="ghost" className="justify-center">
                <AlarmClock className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="justify-center">
                <Folder className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="justify-center">
                <Tag className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="justify-center">
                <Reply className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="justify-center">
                <ReplyAll className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="justify-center">
                <Forward className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" />
              <Button size="icon" variant="ghost" className="justify-center">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <div className="border border-gray-300 rounded m-4">
              <div className="flex w-full h-auto border-b border-gray-300 flex-col p-4">
                <div className="flex justify-between">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-10 w-10 mt-1">
                      <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/9/96/Saint_James_the_Just.jpg" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-md font-semibold">James</h1>
                      <h1 className="text-sm">Faith and Works</h1>
                      <h1 className="text-sm">
                        <span className="font-medium">Reply-to: </span>
                        james@newtestament.com
                      </h1>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    About 2000 years ago
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-4">
                Hi Paul,
                <p className="pt-3">
                  I have some concerns that you might believe that how someone
                  lives doesn’t matter. I have been told that you are telling
                  people they are saved by faith alone and that works are a
                  non-factor. Therefore, I have written the following in a
                  letter I’ve sent out to correct this:
                </p>
                <p className="m-2 p-2 text-sm bg-accent rounded">
                  What good is it, my brothers and sisters, if someone claims to
                  have faith but does not have works? Surely that faith cannot
                  save, can it? If a brother or sister is naked and lacks daily
                  food and one of you says to them, “Go in peace; keep warm and
                  eat your fill,” and yet you do not supply their bodily needs,
                  what is the good of that? So faith by itself, if it has no
                  works, is dead.
                  <br />
                  But someone will say, “You have faith, and I have works.” Show
                  me your faith apart from works, and I by my works will show
                  you faith. You believe that God is one; you do well. Even the
                  demons believe—and shudder. Do you want to be shown, you
                  senseless person, that faith apart from works is worthless?
                  Was not our ancestor Abraham justified by works when he
                  offered his son Isaac on the altar? You see that faith was
                  active along with his works, and by works faith was brought to
                  completion. Thus the scripture was fulfilled that says,
                  “Abraham believed God, and it was reckoned to him as
                  righteousness,” and he was called the friend of God. You see
                  that a person is justified by works and not by faith alone.
                  Likewise, was not Rahab the prostitute also justified by works
                  when she welcomed the messengers and sent them out by another
                  road? For just as the body without the spirit is dead, so
                  faith without works is also dead.
                  <br />
                  <br />
                  <span className="font-semibold">James 2:14-26</span> (NRSVue)
                </p>
                <p className="pt-3">
                  Please let me know what your thoughts are.
                </p>
                <p className="pt-3 font-bold">- James</p>
              </div>
            </div>
            <div className="border border-gray-300 rounded m-4">
              <div className="flex w-full h-auto border-b border-gray-300 flex-col p-4">
                <div className="flex justify-between">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-10 w-10 mt-1">
                      <AvatarImage src="https://cdn.catholic.com/wp-content/uploads/AdobeStock_572194984-900x900.jpeg" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-md font-semibold">Paul</h1>
                      <h1 className="text-sm">Re: Faith and Works</h1>
                      <h1 className="text-sm">
                        <span className="font-medium">Reply-to: </span>
                        paul@apostle.com
                      </h1>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    About 2000 years ago
                  </div>
                </div>
              </div>
              <div className="flex overflow-scroll p-4 flex-col">
                <p className="pt-3">Hi James,</p>
                <p className="pt-3">Thanks for writting to me.</p>
                <p className="pt-3">
                  I think there is a misunderstanding here. People have taken
                  what I wrote and have run with it. They have created the
                  doctrine of “sola fide,” but that’s not what I wrote about. In
                  fact, your letter is the only place in the New Testament where
                  the words “faith alone” are used!{" "}
                </p>
                <p className="pt-3">
                  You see, I don’t think we really disagree; rather, I think we
                  are using the terms faith and works differently. Here’s how I
                  tend to use them:
                </p>
                <p className="pt-3 pl-3">
                  <span className="font-bold mr-1">Faith:</span>Accepting the
                  gospel and being committed to Christ.{" "}
                </p>
                <p className="pt-3 pl-3">
                  <span className="font-bold mr-1">Works (of the law):</span>
                  boundary markers of the law such as circumcision, table
                  regulations, and sabbath.
                </p>
                <p className="pt-3">
                  What I’m trying to refute is that people must become Jewish to
                  be saved and that obedience to these works is a means to
                  salvation. Instead, people must put their full trust in Jesus.
                  Doing so does require that one follows in the ways of Christ,
                  leaves their old life behind, and lives rightly. I thought I
                  was quite clear with this in writings such as Romans 6:4, 16;
                  1 Corinthians 6:9-11; and Ephesians 5:3-5.
                </p>
                <p className="pt-3">
                  I would love to hear how you’re defining faith and works in
                  your writing.
                </p>
                <p className="pt-3 font-semibold">
                  Grace and peace,
                  <br />
                  Paul
                </p>
                <p className="pt-8 text-xs text-gray-500">
                  1. N. T. Wright and Michael F. Bird,{" "}
                  <span className="italic">
                    The New Testament in Its World: An Introduction to the
                    History, Literature and Theology of the First Christians
                  </span>{" "}
                  (London: Society for Promoting Christian Knowledge, 2019),
                  745.
                  <br />
                  2. George Eldon Ladd,{" "}
                  <span className="italic">
                    A Theology of the New Testament,
                  </span>{" "}
                  Rev. ed (Grand Rapids, MI: Eerdmans, 1993), 639.
                  <br />
                  3. James D. G. Dunn,{" "}
                  <span className="italic">The New Perspective on Paul</span>
                  , Rev. ed, 185 (Grand Rapid, MI: W. B. Eerdmans Pub. Co,
                  2008), 111.
                  <br />
                  4. Dunn,{" "}
                  <span className="italic">New Perspective on Paul</span>, 418;
                  Douglas J. Moo,{" "}
                  <span className="italic">
                    James: An Introduction and Commentary
                  </span>
                  , ed. Eckhard J. Schnabel, Logos, Second Edition, Tyndale New
                  Testament Commentaries 16 (Nottingham, England: Inter-Varsity
                  Press, 2015), 61; William Varner, “Does James Have a
                  Theology?,” Dialogismos 2 (2017): 8-9.
                </p>
              </div>
            </div>
            <div className="border border-gray-300 rounded m-4">
              <div className="flex w-full h-auto border-b border-gray-300 flex-col p-4">
                <div className="flex justify-between">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-10 w-10 mt-1">
                      <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/9/96/Saint_James_the_Just.jpg" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-md font-semibold">James</h1>
                      <h1 className="text-sm">Re: Faith and Works</h1>
                      <h1 className="text-sm">
                        <span className="font-medium">Reply-to: </span>
                        james@newtestament.com
                      </h1>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    About 2000 years ago
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-4">
                Hi Paul,
                <p className="pt-3">
                  Thanks for your input. I see the misunderstanding.
                </p>
                <p className="pt-3">I’m defining them along these lines:</p>
                <p className="pt-3 pl-3">
                  <span className="font-bold mr-1">Faith:</span>Asserting and
                  cognitively agreeing with right doctrines.
                </p>
                <p className="pt-3 pl-3">
                  <span className="font-bold mr-1">Works:</span>
                  Deed of love.
                </p>
                <p className="pt-3">
                  When I’m speaking of faith in this context, I’m speaking more
                  in line with the rabbinic definition. I agree that true faith
                  is about commitment to God and Christ, and I would agree that
                  faith, as you state it, is given to us (see Jas. 1:17-18). I
                  just do not want people to misunderstand your gospel as
                  lawless. Right living must flow from faith or there is no true
                  faith present at all. You too place a high value on this, I
                  know. We really are going for the same thing here: we want
                  people to both believe and live rightly. I spent some time
                  this week and counted 16 times in your letters where you use
                  the phrase “good works” in a positive light. Two other things
                  stood out to me as I read. First, you commend the
                  Thessalonians for their works of faith (1 Thess. 1:3). Second,
                  you told the Galatians that “the only thing that counts is
                  faith working through love” (Gal. 5:6). To which I say,
                  “Exactly.”
                </p>
                <p className="pt-3">
                  That said, I think we approach Abraham a bit differently. Like
                  most Jews of our time, I focus on his act of faithfulness in
                  Genesis 22. What is significant about Abraham to me is that he
                  remained faithful. However, it seems that you are more focused
                  on his initial step of faith than on his on-going
                  faithfulness. Thoughts?
                </p>
                <p className="pt-3 font-bold">- James</p>
                <p className="pt-8 text-xs text-gray-500">
                  5. Ladd,{" "}
                  <span className="italic">
                    New Theology of the New Testament,
                  </span>{" "}
                  639.
                  <br />
                  6. Ladd,{" "}
                  <span className="italic">
                    New Theology of the New Testament,
                  </span>{" "}
                  639; Moo,
                  <span className="italic">James,</span> 60; Varner, “Does James
                  Have a Theology?”, 8-9.
                  <br />
                  7. Donald Alfred Hagner,{" "}
                  <span className="italic">
                    The New Testament: A Historical and Theological Introduction
                  </span>
                  (Grand Rapids, MI: Baker Academic, 2012), 672. See also Walter
                  A. Elwell and Barry J. Beitzel, “James, Letter Of,” in
                  <span className="italic">
                    Baker Encyclopedia of the Bible,
                  </span>{" "}
                  vol. 2 (Grand Rapids, MI: Baker Book House, 1988), 1093; Moo,
                  <span className="italic">James,</span>
                  61
                  <br />
                  8. 2 Corinthians 9:8; Ephesians 2:10; Philippians 1:6;
                  Colossians 1:10; 2 Thessalonians 2:17; 1 Timothy 2:10; 5:10,
                  25; 6:18; 2 Timothy 2:21; 3:17; Titus 1:16; 2:7; 3:1, 8, 14.
                  <br />
                  9. Dunn,
                  <span className="italic"> New Perspective on Paul,</span> 47.
                  <br />
                  10. Michael F. Bird,{" "}
                  <span className="italic">
                    Evangelical Theology: A Biblical and Systematic Introduction
                  </span>{" "}
                  (Grand Rapids: Zondervan, 2013), 538; Varner, “Does James Have
                  a Theology?”, 9.
                </p>
              </div>
            </div>
            <div className="border border-gray-300 rounded m-4">
              <div className="flex w-full h-auto border-b border-gray-300 flex-col p-4">
                <div className="flex justify-between">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-10 w-10 mt-1">
                      <AvatarImage src="https://cdn.catholic.com/wp-content/uploads/AdobeStock_572194984-900x900.jpeg" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-md font-semibold">Paul</h1>
                      <h1 className="text-sm">Re: Faith and Works</h1>
                      <h1 className="text-sm">
                        <span className="font-medium">Reply-to: </span>
                        paul@apostle.com
                      </h1>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    About 2000 years ago
                  </div>
                </div>
              </div>
              <div className="flex overflow-scroll p-4 flex-col">
                <p className="pt-3">Hi James,</p>
                <p className="pt-3">
                  It’s not that I fully disagree with you. It’s just that
                  Abraham’s calling is a significant moment where God chose
                  someone in his grace, and that is what Christ does for us now.
                  That is not to negate his faithfulness; it’s just to draw
                  attention to his faith. You’re focused on justification while
                  I’m focused on salvation. They both matter, but they are
                  different issues.{" "}
                </p>
                <p className="pt-3">
                  I think there is a misunderstanding here. People have taken
                  what I wrote and have run with it. They have created the
                  doctrine of “sola fide,” but that’s not what I wrote about. In
                  fact, your letter is the only place in the New Testament where
                  the words “faith alone” are used!{" "}
                </p>
                <p className="pt-3">
                  Nevertheless, I think we are both making helpful contributions
                  to the tradition.
                </p>
                <p className="pt-3">
                  I will add that I do think that we can’t under-emphasis the
                  fact that faith does play a major role in salvation, and this
                  is different than traditional Jewish thought. Again, faith
                  should lead to action and it isn’t faith without it, but faith
                  does save.
                </p>
                <p className="pt-3">Thanks for all you do.</p>
                <p className="pt-3 font-semibold">
                  Grace and peace,
                  <br />
                  Paul
                </p>
                <p className="pt-8 text-xs text-gray-500">
                  11. Varner, “Does James Have a Theology?”, 9.
                  <br />
                  12. N. T. Wright,{" "}
                  <span className="italic">
                    The New Testament and the People of God,
                  </span>{" "}
                  Christian Origins and the People of God (London: SPCK, 1992),
                  245-246.
                </p>
              </div>
            </div>
            <div className="border border-gray-300 rounded m-4">
              <div className="flex w-full h-auto border-b border-gray-300 flex-col p-4">
                <div className="flex justify-between">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-10 w-10 mt-1">
                      <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/9/96/Saint_James_the_Just.jpg" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-md font-semibold">James</h1>
                      <h1 className="text-sm">Re: Faith and Works</h1>
                      <h1 className="text-sm">
                        <span className="font-medium">Reply-to: </span>
                        james@newtestament.com
                      </h1>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    About 2000 years ago
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-4">
                Hi Paul,
                <p className="pt-3">
                  We’re definitely not as at odds as I first thought.
                </p>
                <p className="pt-3">Thanks for the discussion.</p>
                <p className="pt-3">
                  Praying for you and all that you’re doing
                </p>
                <p className="pt-3">Keep bringing people to the truth,</p>
                <p className="pt-3 font-bold">- James</p>
              </div>
            </div>
            <div className="border border-gray-300 rounded m-4">
              <div className="flex w-full h-auto border-b border-gray-300 flex-col p-4">
                <div className="flex justify-between">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-10 w-10 mt-1">
                      <AvatarImage src="https://cdn.catholic.com/wp-content/uploads/AdobeStock_572194984-900x900.jpeg" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-md font-semibold">Paul</h1>
                      <h1 className="text-sm">Re: Faith and Works</h1>
                      <h1 className="text-sm">
                        <span className="font-medium">Reply-to: </span>
                        paul@apostle.com
                      </h1>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    About 2000 years ago
                  </div>
                </div>
              </div>
              <div className="flex overflow-scroll p-4 flex-col">
                <p className="pt-3">
                  I really enjoyed this discussion, so thank you, James.
                </p>
                <p className="pt-3 font-semibold">
                  Grace and peace,
                  <br />
                  Paul
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
