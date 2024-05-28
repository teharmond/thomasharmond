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
      <div className="flex felx-row h-screen w-full select-none ">
        <Sidebar />
        <EmailList />
        <div className="bg-white w-full overflow-scroll select-none">
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
                  I have been hearing some rumors that you are teaching that the
                  way people live and behave does not matter. You have
                  apparently told people that they are saved and justified by
                  faith alone and that works are a non-factor. This is
                  unacceptable and morally problematic if this is so.
                  <sup>1</sup> I went ahead and included this passage in my most
                  recent letter to try and correct this teaching of yours:
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
                  Please write back quickly with an explanation and response.
                </p>
                <p className="pt-3 font-bold">- James</p>
                <p className="pt-8 text-xs text-gray-500">
                  1. Craig L. Blomberg, and Mariam J. Kamell.{" "}
                  <span className="italic">James.</span>
                  Vol. 16. Zondervan Exegetical Commentary on the New Testament.
                  (Grand Rapids, MI: Zondervan, 2008), 135-136. See also Chris
                  A. Vlachos, <span className="italic">James</span>, ed. Murray
                  J. Harris and Andreas J. Kˆstenberger. Exegetical Guide to the
                  Greek New Testament. (B&H Academic, 2013), 94-95.
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
                <p className="pt-3">James,</p>
                <p className="pt-3">
                  There is a total misunderstanding here, but I do not think it
                  is all your fault. People have been taking some of what I have
                  written and have run with it to the point that they are doing
                  exactly what you are suggesting is not to be done! There are
                  some who have been ignoring the practices and ethics of the
                  faith, claiming that they can do whatever they like since they
                  are free. While I have written much on the freedom we have in
                  Christ, I have not done so as a way to downplay the importance
                  of how one lives. To prove my point, your letter is actually
                  the only place in the New Testament where the words “faith
                  alone” are used!
                  <sup>2</sup>
                </p>
                <p className="pt-3">
                  You see, I don’t think we really disagree; rather, I think we
                  are using the terms faith and works differently to talk about
                  two different things. Here’s how I tend to use them:
                </p>
                <p className="pt-3 pl-3">
                  <span className="font-bold ">Faith</span> is when someone
                  recieves the gospel and begins their committed to Christ.
                  <sup>3</sup>
                </p>
                <p className="pt-3 pl-3">
                  <span className="font-bold">Works (of the law)</span> are the
                  boundary markers of the Jewish faith such as circumcision,
                  table regulations, and sabbath keeping.<sup>4</sup>
                </p>
                <p className="pt-3">
                  What I’m trying to refute is that people must become Jewish to
                  be saved and that obedience to these works is a means to
                  salvation.<sup>5</sup> Instead, people must put their full
                  trust in Jesus. Doing so does require that one follows in the
                  ways of Christ, leaves their old life behind, and lives
                  rightly. I thought I was quite clear with this in writings
                  such as Romans 6:4, 16; 1 Corinthians 4:2, 6:9-11; and
                  Ephesians 5:3-5.
                </p>
                <p className="pt-3">
                  Let me give one more example from my writings. In 1
                  Corinthians 3:10-15, I speak of two types of builders. The
                  first builds with intention while the second builds
                  carelessly. What the first builds survives while what the
                  second builds is burned up. Sure, I say that the latter will
                  be saved as through fire, but that does not negate the point
                  that how one works matters. There is still a judgement for the
                  latter in the end where they will be shown to not{" "}
                  <span className="italic">yet</span> be justified.<sup>6</sup>
                </p>
                <p className="pt-3">
                  I noticed that you called attention to Abraham&#8217;s
                  <span className="italic"> faithfulness</span> while I tend to
                  point out his <span className="italic">faith</span>. That is a
                  valid thing to do. However, I will wait until I hear back from
                  you about the above before I expand my thoughts on this.
                </p>
                <p className="pt-3">
                  I love you, dear brother, and I look forward to hearing from
                  you soon.
                </p>
                <p className="pt-3 font-semibold">
                  Grace and peace,
                  <br />
                  Paul
                </p>
                <p className="pt-8 text-xs text-gray-500">
                  2. N. T. Wright and Michael F. Bird,{" "}
                  <span className="italic">
                    The New Testament in Its World: An Introduction to the
                    History, Literature and Theology of the First Christians
                  </span>{" "}
                  (London: Society for Promoting Christian Knowledge, 2019),
                  745.
                  <br />
                  3. George Eldon Ladd,{" "}
                  <span className="italic">
                    A Theology of the New Testament,
                  </span>{" "}
                  Rev. ed (Grand Rapids, MI: Eerdmans, 1993), 639.
                  <br />
                  4. James D. G. Dunn,{" "}
                  <span className="italic">The New Perspective on Paul</span>
                  , Rev. ed, 185 (Grand Rapid, MI: W. B. Eerdmans Pub. Co,
                  2008), 111.
                  <br />
                  5. Dunn,{" "}
                  <span className="italic">New Perspective on Paul</span>, 418;
                  Douglas J. Moo,{" "}
                  <span className="italic">
                    James: An Introduction and Commentary
                  </span>
                  , ed. Eckhard J. Schnabel, Logos, Second Edition, Tyndale New
                  Testament Commentaries 16 (Nottingham, England: Inter-Varsity
                  Press, 2015), 61; Varner, “Does James Have a Theology?,” 8-9.
                  <br />
                  6. William Varner, “Does James Have a Theology?,” Dialogismos
                  2 (2017): 8-9.
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
                  Thanks for your input. I see the misunderstanding. I still am
                  glad I wrote the letter. Even if you do not need correction,
                  those who misunderstand you do. I want people to understand,
                  as you do, that faith is not just agreeing with the right
                  doctrine; it is a practical commitment to and trust in God.
                  <sup>7</sup> The goal of this type of faith is that people
                  would do deeds of love, just as Jesus commanded.<sup>8</sup>{" "}
                  Now that I think of it, I believe you spoke about this in
                  Galatians 5:6 where you talk about faith working through love.
                </p>
                <p className="pt-3">
                  I am glad we are on the same page on this. I just do not want
                  people to misunderstand your gospel as lawless.
                  <sup>9</sup> Right belief, right living. That is what we both
                  want to see form in the church as it continues to grow.
                </p>
                <p className="pt-3">
                  Let us come back to the Abraham conversation. Like most Jews
                  of our time, I focus on his faithfulness as seen in Genesis
                  22.
                  <sup>10</sup> What is significant about Abraham to me is that
                  he remained faithful over the course of his life. He trusted
                  what God had promised, and this was seen by him continuing to
                  live aligned to this belief. That said, it seems that you are
                  more focused on his faith when God chose him rather than on
                  his on-going faithfulness.<sup>11</sup> Is that fair to say?
                </p>
                <p className="pt-3 font-bold">- James</p>
                <p className="pt-8 text-xs text-gray-500">
                  7. Ladd,{" "}
                  <span className="italic">
                    New Theology of the New Testament,
                  </span>{" "}
                  639; Moo,
                  <span className="italic">James,</span> 60; Varner, “Does James
                  Have a Theology?”, 8-9. See also see James 1:17-18.
                  <br />
                  8. Ladd,{" "}
                  <span className="italic">
                    New Theology of the New Testament,
                  </span>{" "}
                  639.
                  <br />
                  9. Donald Alfred Hagner,{" "}
                  <span className="italic">
                    The New Testament: A Historical and Theological Introduction
                  </span>
                  (Grand Rapids, MI: Baker Academic, 2012), 672. See also Moo,
                  <span className="italic">James,</span>
                  61
                  <br />
                  10. Dunn,
                  <span className="italic"> New Perspective on Paul,</span> 47.
                  <br />
                  11. Michael F. Bird,{" "}
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
                <p className="pt-3">Glad we agree.</p>
                <p className="pt-3">
                  I agree that his faithfulness matters (though he clearly
                  continues to fail (see Gen. 12 and 20)). But I think it is
                  more significant that God chose him and not he chooses us.
                  This is not to negate Abraham&#8217;s faithfulness; it's just
                  to draw more attention to God&#8217;s faithfulness towards us.
                </p>
                <p className="pt-3">
                  As you know, we have never thought that our people are saved
                  because they earned it; we know that it is a gift from God and
                  that obedience is the response to this gift.<sup>12</sup>{" "}
                  Works matter, and they play a role in our justification, but
                  they do not determine our salvation.<sup>13</sup>
                </p>
                <p className="pt-3">
                  Maybe I can land this plane by saying this. Faith cannot be
                  abstracted; it will always have a real-world impact on how we
                  think, live, and act.<sup>14</sup> Faith without works is
                  indeed dead because it is no faith at all. Faith itself will
                  always work if it is true. When this faith does work, it leads
                  to our justification.
                </p>
                <p className="pt-3">
                  Thanks for such a lively conversation and for all you do for
                  the sake of the Gospel.
                </p>
                <p className="pt-3">
                  Please pray for me as I await my trial here in Rome.
                </p>
                <p className="pt-3 font-semibold">
                  Grace and peace,
                  <br />
                  Paul
                </p>
                <p className="pt-8 text-xs text-gray-500">
                  12. Dunn,{" "}
                  <span className="italic"> New Perspective on Paul,</span> 47.
                  <br />
                  13. Varner, “Does James Have a Theology?”, 9.
                  <br />
                  14. See N. T. Wright,{" "}
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
                  I enjoyed it as well, and I found it quite helpful.
                </p>
                <p className="pt-3">Thanks for the discussion.</p>
                <p className="pt-3">
                  Praying for you in this time. May the grace of the Lord Jesus
                  be with you as you continue to bring people to the truth.
                </p>
                <p className="pt-3 font-bold">- James</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
